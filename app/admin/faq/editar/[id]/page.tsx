'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter, useParams } from "next/navigation"

export default function EditarFAQ() {
    const router =  useRouter()
    const params =  useParams()
    const [loading, setLoading] = useState(true)
    const [pergunta, setPergunta] = useState('')
    const [resposta, setResposta] =  useState('')

    useEffect(() => {
        async function carregarFAQ() {
            const { data } = await supabase 
            .from('faq')
            .select('*')
            .eq('id', params.id)
            .single()

            if (data) {
                setPergunta(data.pergunta)
                setResposta(data.resposta)
            }
            setLoading(false)
        }
        carregarFAQ()
    }, [params.id])

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
        .from('faq')
        .update({ pergunta, resposta})
        .eq('id', params.id)

        if (error) {
            alert("Erro ao atualizar: " + error.message)
        } else {
            alert("FAQ atualizado com sucesso!")
            router.push('/admin/faq')
        }
        setLoading(false)
    }
    
    if (loading) return <div className="p-10 text-black">Carregando...</div>

  return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">Editar Pergunta</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pergunta</label>
          <input 
            className="w-full p-2 border rounded text-black bg-white" 
            value={pergunta}
            onChange={e => setPergunta(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Resposta</label>
          <textarea 
            className="w-full p-2 border rounded h-32 text-black bg-white" 
            value={resposta}
            onChange={e => setResposta(e.target.value)} 
            required 
          />
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded">
            {loading ? 'Salvando...' : 'Atualizar FAQ'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )

}