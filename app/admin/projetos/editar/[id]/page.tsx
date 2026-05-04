'use client' 

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function EditarProjeto() {
    const router = useRouter()
    const params = useParams()
    const [loading, setLoading] = useState(true)

    const [form, setForm] = useState({
        titulo: '',
        localizacao: '',
        data_projeto: '',
        descricao: '',
        comentario_equipe: ''
    })

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
                    localizacao: data.localizao || '',
                    data_projeto: data.data_projeto ||'',
                    descricao: data.descricao || '',
                    comentario_equipe: data.comentario_equipe || ''
                })
            }
            setLoading(false)
        }
        fetchProjeto()
    }, [params.id])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
        .from('projeto')
        .update(form)
        .eq('id', params.id)

        if (error) {
            alert("Erro ao atualizar: " + error.message)
        } else {
            alert("Projeto atualizado com sucesso!")
            router.push('/admin/projetos')
        }
        setLoading(false)
    }
    if (loading) return <div className="p-10">Carregando projeto...</div>

  return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Editar Projeto: {form.titulo}</h1>
      
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-lg shadow-sm space-y-4 max-w-4xl">
        <input 
          className="w-full p-2 border rounded text-black bg-white" 
          value={form.titulo}
          onChange={e => setForm({...form, titulo: e.target.value})}
          placeholder="Título" 
          required 
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="p-2 border rounded text-black bg-white" 
            value={form.localizacao}
            onChange={e => setForm({...form, localizacao: e.target.value})}
            placeholder="Localização" 
          />
          <input 
            className="p-2 border rounded text-black bg-white" 
            type="date" 
            value={form.data_projeto}
            onChange={e => setForm({...form, data_projeto: e.target.value})}
          />
        </div>

        <textarea 
          className="w-full p-2 border rounded h-32 text-black bg-white" 
          value={form.descricao}
          onChange={e => setForm({...form, descricao: e.target.value})}
          placeholder="Descrição" 
        />

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            {loading ? 'Salvando...' : 'Atualizar Projeto'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded text-black">Cancelar</button>
        </div>
      </form>
    </div>
  )
}