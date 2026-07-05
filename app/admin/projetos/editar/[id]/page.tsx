'use client' 

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function EditarProjeto() {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        titulo: '',
        localizacao: '',
        data_projeto: '',
        descricao: '',
        comentario_equipe: ''
    })

    // Estados de Fotos
    const [fotosOriginais, setFotosOriginais] = useState<any[]>([])
    const [fotosParaDeletar, setFotosParaDeletar] = useState<number[]>([])
    const [novasFotos, setNovasFotos] = useState<File[]>([])
    const [capa, setCapa] = useState<{ tipo: 'original' | 'nova', valor: number | string } | null>(null)

    useEffect(() => {
        async function fetchProjeto() {
            const { data, error } = await supabase
            .from('projeto')
            .select('*')
            .eq('id', params.id)
            .single()

            if (data) {
                setForm({
                    titulo: data.titulo,
                    localizacao: data.localizacao || '',
                    data_projeto: data.data_projeto ||'',
                    descricao: data.descricao || '',
                    comentario_equipe: data.comentario_equipe || ''
                })

                // Busca as fotos vinculadas
                const { data: fotos } = await supabase
                    .from('foto_projeto')
                    .select('*')
                    .eq('projeto_id', params.id)
                    .order('id', { ascending: true })

                if (fotos && fotos.length > 0) {
                    setFotosOriginais(fotos)
                    setCapa({ tipo: 'original', valor: fotos[0].id }) // Pela lógica, a primeira é a capa
                }
            }
            setLoading(false)
        }
        fetchProjeto()
    }, [params.id])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        // 1. Atualiza dados do projeto
        const { error } = await supabase
        .from('projeto')
        .update(form)
        .eq('id', params.id)

        if (error) {
            alert("Erro ao atualizar projeto: " + error.message)
            setSaving(false)
            return
        }

        // 2. Excluir fotos marcadas (Storage e BD - limpamos do BD totalmente no final, mas excluímos do BD agora pra segurança)
        if (fotosParaDeletar.length > 0) {
            const fotosAExcluir = fotosOriginais.filter(f => fotosParaDeletar.includes(f.id))
            const filesToRemove = fotosAExcluir.map(f => {
                const path = f.url.split('/public/fotos-projeto/')[1];
                return path ? decodeURIComponent(path) : null;
            }).filter(Boolean) as string[];

            if (filesToRemove.length > 0) {
                await supabase.storage.from('fotos-projeto').remove(filesToRemove)
            }
        }

        // 3. Fazer Upload de novas fotos
        const novasFotosUrls: string[] = []
        let capaNovaUrl = ""
        let uploadErros = 0

        for (let i = 0; i < novasFotos.length; i++) {
            const file = novasFotos[i]
            const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
            const fileName = `${Date.now()}-${safeName}`
            const { data: uploadData, error: uError} = await supabase.storage
                .from('fotos-projeto')
                .upload(fileName, file)

            if (uError) {
                uploadErros++
                continue
            }

            if(uploadData) {
                const { data: urlData } = supabase.storage.from('fotos-projeto').getPublicUrl(fileName)
                novasFotosUrls.push(urlData.publicUrl)

                if (capa?.tipo === 'nova' && capa.valor === i) {
                    capaNovaUrl = urlData.publicUrl
                }
            }
        }

        // 4. Reorganizar a Capa e Salvar (Reinserindo Links)
        const fotosRestantes = fotosOriginais.filter(f => !fotosParaDeletar.includes(f.id))
        const urlsRestantes = fotosRestantes.map(f => f.url)
        const todasUrls = [...urlsRestantes, ...novasFotosUrls]

        if (todasUrls.length > 0) {
            let urlCapaFinal = todasUrls[0] // fallback para a primeira da lista

            if (capa?.tipo === 'original') {
                const fotoCapaO = fotosOriginais.find(f => f.id === capa.valor)
                if (fotoCapaO) urlCapaFinal = fotoCapaO.url
            } else if (capa?.tipo === 'nova' && capaNovaUrl) {
                urlCapaFinal = capaNovaUrl
            }

            // Remove a capa da lista normal pra colocar ela no índice 0
            const arrayFiltrado = todasUrls.filter(u => u !== urlCapaFinal)
            arrayFiltrado.unshift(urlCapaFinal)

            // Apaga todos os links de fotos do projeto no BD (as reais não serão apagadas do Storage)
            await supabase.from('foto_projeto').delete().eq('projeto_id', params.id)

            // Reinsere ordenado
            for (const url of arrayFiltrado) {
                await supabase.from('foto_projeto').insert([{
                    projeto_id: params.id,
                    url: url
                }])
            }
        } else {
             // Caso não sobre nenhuma foto
             await supabase.from('foto_projeto').delete().eq('projeto_id', params.id)
        }

        if (uploadErros > 0) {
            alert(`Projeto atualizado, mas houve erro no envio de ${uploadErros} nova(s) foto(s).`)
        } else {
            alert("Projeto atualizado com sucesso!")
        }
        
        router.push('/admin/projetos')
    }

    const toggleDeleteOriginal = (id: number) => {
        setFotosParaDeletar(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
        // Se a foto marcada para deletar for a capa, movemos a capa para nulo
        if (capa?.tipo === 'original' && capa.valor === id) {
            setCapa(null) 
        }
    }

    const removerNovaFoto = (index: number) => {
        setNovasFotos(prev => prev.filter((_, i) => i !== index))
        if (capa?.tipo === 'nova' && capa.valor === index) {
            setCapa(null)
        } else if (capa?.tipo === 'nova' && typeof capa.valor === 'number' && capa.valor > index) {
            setCapa({ tipo: 'nova', valor: capa.valor - 1 })
        }
    }

    if (loading) return <div className="p-10">Carregando projeto...</div>

  return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Editar Projeto: {form.titulo}</h1>
      
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-lg shadow-sm space-y-4 max-w-4xl">
        <input 
          className="w-full p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
          value={form.titulo}
          onChange={e => setForm({...form, titulo: e.target.value})}
          placeholder="Título" 
          required 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
            value={form.localizacao}
            onChange={e => setForm({...form, localizacao: e.target.value})}
            placeholder="Localização" 
          />
          <input 
            className="p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
            type="date" 
            value={form.data_projeto}
            onChange={e => setForm({...form, data_projeto: e.target.value})}
          />
        </div>

        <textarea 
          className="w-full p-2 border rounded h-32 text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
          value={form.descricao}
          onChange={e => setForm({...form, descricao: e.target.value})}
          placeholder="Descrição" 
        />

        {/* MÓDULO DE FOTOS */}
        <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold mb-4 text-black">Fotos do Projeto</h2>
            <p className="text-sm text-gray-500 mb-4">Gerencie as fotos atuais, exclua o que não serve mais e adicione novas. Escolha uma como capa!</p>
            
            {fotosOriginais.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-semibold text-black mb-2">Fotos Já Cadastradas</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {fotosOriginais.map(foto => {
                        const isDeleted = fotosParaDeletar.includes(foto.id)
                        const isCapa = capa?.tipo === 'original' && capa.valor === foto.id

                        return (
                            <div key={foto.id} className="relative group rounded overflow-hidden border-4 transition-all h-24 border-transparent hover:border-gray-300">
                                <img 
                                    src={foto.url} 
                                    alt="Foto do projeto" 
                                    className={`w-full h-full object-cover transition-opacity ${isDeleted ? 'opacity-30 grayscale' : ''}`}
                                />
                                
                                {/* Overlay Escuro & Botões se não estiver deletado */}
                                {!isDeleted && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                                        <button 
                                            type="button"
                                            onClick={() => setCapa({ tipo: 'original', valor: foto.id })}
                                            className="text-white text-xs bg-black/70 hover:bg-[#D4C3A1] hover:text-black px-2 py-1 rounded transition-colors"
                                        >
                                            Definir Capa
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => toggleDeleteOriginal(foto.id)}
                                            className="text-white text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded transition-colors"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                )}

                                {/* Se estiver deletado, botão pra desfazer */}
                                {isDeleted && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button 
                                            type="button"
                                            onClick={() => toggleDeleteOriginal(foto.id)}
                                            className="text-white text-xs bg-blue-600/90 hover:bg-blue-700 px-2 py-1 rounded shadow"
                                        >
                                            Desfazer
                                        </button>
                                    </div>
                                )}

                                {/* Badge de Capa */}
                                {isCapa && !isDeleted && (
                                    <div className="absolute top-1 left-1 bg-[#D4C3A1] text-black text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shadow">
                                        Capa
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    </div>
                </div>
            )}

            <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none mb-6">
                <p className="mb-2">Adicionar Novas Fotos (JPG/PNG)</p>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4C3A1] outline-none"
                    onChange={e => {
                        if (e.target.files) {
                            // Concatena com as novas já selecionadas
                            setNovasFotos(prev => [...prev, ...Array.from(e.target.files!)])
                        }
                    }}
                />
            </div>

            {novasFotos.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-semibold text-black mb-2">Novas Fotos a Adicionar</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {novasFotos.map((file, index) => {
                        const isCapa = capa?.tipo === 'nova' && capa.valor === index
                        return (
                            <div key={index} className="relative group rounded overflow-hidden border-4 transition-all h-24 border-transparent hover:border-gray-300">
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt={`Nova preview ${index}`} 
                                    className="w-full h-full object-cover"
                                />
                                
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                                    <button 
                                        type="button"
                                        onClick={() => setCapa({ tipo: 'nova', valor: index })}
                                        className="text-white text-xs bg-black/70 hover:bg-[#D4C3A1] hover:text-black px-2 py-1 rounded transition-colors"
                                    >
                                        Definir Capa
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => removerNovaFoto(index)}
                                        className="text-white text-xs bg-red-600/80 hover:bg-red-700 px-2 py-1 rounded transition-colors"
                                    >
                                        Remover
                                    </button>
                                </div>

                                {/* Badge de Capa */}
                                {isCapa && (
                                    <div className="absolute top-1 left-1 bg-[#D4C3A1] text-black text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shadow">
                                        Capa
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    </div>
                </div>
            )}
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
            {saving ? 'Salvando...' : 'Atualizar Projeto'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded text-black hover:bg-gray-300 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}