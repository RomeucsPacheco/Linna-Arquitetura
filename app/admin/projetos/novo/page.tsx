'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function NovoProjeto() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ titulo: '', localizacao: '', data: '', descricao: '', comentario: ''})
    const [files, setFiles] = useState<File[]>([])
    const [coverIndex, setCoverIndex] = useState(0) // Estado para armazenar o índice da capa

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/admin/login')
            }
        }
        checkSession()
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        //criar o registro do projeto
        const { data: projeto, error: pError, status } = await supabase
            .from('projeto')
            .insert([{
                titulo: form.titulo,
                localizacao: form.localizacao,
                descricao: form.descricao,
                comentario_equipe: form.comentario,
                data_projeto: form.data
            }])
            .select()
            .single()

            if(pError || (status !== 201 && status !== 204)) {
                alert("Erro ao criar projeto: " + (pError?.message || "Operação não permitida"));
                setLoading(false);
                return;
            }

            // Reorganiza as fotos para que a capa seja a primeira do array
            const orderedFiles = [...files];
            if (coverIndex > 0 && coverIndex < orderedFiles.length) {
                const cover = orderedFiles.splice(coverIndex, 1)[0];
                orderedFiles.unshift(cover);
            }

            //uploado das fotos (RF08)
            let uploadErros = 0;

            for (const file of orderedFiles) {
                const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
                const fileName = `${Date.now()}-${safeName}`
                const { data: uploadData, error: uError} = await supabase.storage
                    .from('fotos-projeto')
                    .upload(fileName, file)

                if (uError) {
                    console.error("Erro no upload da foto:", uError);
                    uploadErros++;
                    continue;
                }

                if(uploadData) {
                    //pega a URL pública da foto
                    const { data: urlData } = supabase.storage.from('fotos-projeto').getPublicUrl(fileName)

                    //salvar a url na tabela de fotos viculada ao projeto
                    await supabase.from('foto_projeto').insert([{
                        projeto_id: projeto.id,
                        url: urlData.publicUrl
                    }])
                }
            }
            
            if (uploadErros > 0) {
                alert(`Projeto cadastrado, mas houve falha no envio de ${uploadErros} foto(s).`)
            } else {
                alert("Projeto cadastrado com sucesso!")
            }
            
            router.push('/admin/projetos')
    }

    return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Projeto</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm space-y-4 max-w-4xl">
        <input 
          className="w-full p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
          placeholder="Título do Projeto" 
          onChange={e => setForm({...form, titulo: e.target.value})} 
          required 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
          className="p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
          placeholder="Localização" 
          onChange={e => setForm({...form, localizacao: e.target.value})} />
          <input className="p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" type="date" onChange={e => setForm({...form, data: e.target.value})} />
        </div>

        <textarea 
        className="w-full p-2 border rounded h-32 text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
        placeholder="Descrição Detalhada" 
        onChange={e => setForm({...form, descricao: e.target.value})} />
        <textarea 
        className="w-full p-2 border rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none" 
        placeholder="Comentário da Equipe" 
        onChange={e => setForm({...form, comentario: e.target.value})} />

        <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none">
          <p className="mb-2">Selecione as fotos (JPG/PNG)</p>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4C3A1] outline-none"
            onChange={e => {
                setFiles(Array.from(e.target.files || []));
                setCoverIndex(0); // Reseta a capa para a primeira foto ao selecionar novas
            }}
          />
        </div>

        {files.length > 0 && (
          <div className="bg-white p-4 border rounded shadow-sm text-black">
            <p className="font-bold mb-3">Escolha a Foto de Capa:</p>
            <p className="text-sm text-gray-500 mb-4">Esta foto será a principal na página inicial e a primeira no portfólio.</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {files.map((file, index) => {
                const isCover = index === coverIndex;
                return (
                  <div 
                    key={index} 
                    onClick={() => setCoverIndex(index)}
                    className={`relative cursor-pointer rounded overflow-hidden border-4 transition-all h-24 ${isCover ? 'border-[#D4C3A1] scale-105' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Preview ${index}`} 
                      className="w-full h-full object-cover"
                    />
                    {isCover && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-xs uppercase bg-[#D4C3A1] px-2 py-1 rounded">Capa</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded">
            {loading ? 'Salvando...' : 'Salvar Projeto'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded">Cancelar</button>
        </div>
      </form>
    </div>
  )
}