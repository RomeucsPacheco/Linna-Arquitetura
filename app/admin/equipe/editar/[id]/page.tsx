'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter, useParams} from 'next/navigation'

export default function EditarMembro() {
    const router = useRouter()
    const params = useParams() //Captura ID da URL
    const [loading, setLoading] = useState(true)

    //Estados do formulario
    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [fotoUrl, setFotoUrl] = useState('')
    const [novaFoto, setNovaFoto] = useState<File | null>(null)

    //Carregar dados atuais do moembro ao abrir a pagina
    useEffect(() => {
        async function carregarMembro(){
            const { data, error } = await supabase
            .from('membro_equipe')
            .select('*')
            .eq('id', params.id)
            .single()

            if (data) {
                setNome(data.nome)
                setCargo(data.cargo)
                setDescricao(data.descricao || '')
                setFotoUrl(data.foto_url || '')
            }
            setLoading(false)
        }
        carregarMembro()
    }, [params.id])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        let urlFinal = fotoUrl

        //Se selecionou uma foto nova, faz o upload
        if (novaFoto) {
            const fileName = `equipe/${Date.now()}${novaFoto.name}`
            const { data: uploadData } = await supabase.storage
            .from('fotos-projetos')
            .upload(fileName, novaFoto)
            
            if (uploadData) {
                const { data } = supabase.storage.from('fotos-projetos').getPublicUrl(fileName)
                urlFinal = data.publicUrl
            }
        }
        //atualiza o banco (UPDATE)
        const { error } = await supabase
        .from('membro_equipe')
        .update({ nome, cargo, descricao, foto_url: urlFinal})
        .eq('id', params.id)

        if (error) {
            alert("Erro ao atualizar: " + error.message)
        } else {
            alert("Membro atualizado com sucesso!")
            router.push('/admin/equipe')
        }
        setLoading(false)
    }
    
    if(loading)
        return <div className="p-10">Carregando dados...</div>

  return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Editar Membro: {nome}</h1>
      
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-lg shadow-sm space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input className="w-full p-2 border rounded text-black bg-white" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo</label>
          <input className="w-full p-2 border rounded text-black bg-white" value={cargo} onChange={e => setCargo(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição / Bio</label>
          <textarea className="w-full p-2 border rounded text-black bg-white h-24" value={descricao} onChange={e => setDescricao(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Foto Atual</label>
          {fotoUrl && <img src={fotoUrl} alt="Atual" className="w-20 h-20 rounded-full mb-2 object-cover" />}
          <input type="file" accept="image/*" onChange={e => setNovaFoto(e.target.files ? e.target.files[0] : null)} className="text-sm" />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded">Salvar Alterações</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded text-black">Cancelar</button>
        </div>
      </form>
    </div>
  )
}