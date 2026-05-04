'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
export default function NovoFAQ() {
    const [pergunta, setPergunta] = useState('')
    const [resposta, setResposta] = useState('')
    const router = useRouter()

    async function salvar(e: React.FormEvent) {
        e.preventDefault()
        const { error } = await supabase
        .from('faq')
        .insert([{pergunta, resposta}])

        if (error) alert(error.message)
        else {
            alert("Pergunta adicionada!")
            router.push('/admin/faq')
        }
    }


return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">Nova Pergunta</h1>
      <form onSubmit={salvar} className="bg-white p-6 rounded shadow-md max-w-2xl space-y-4">
        <input 
          className="w-full p-2 border rounded text-black bg-white" 
          placeholder="Pergunta" 
          onChange={e => setPergunta(e.target.value)} 
          required 
        />
        <textarea 
          className="w-full p-2 border rounded h-32 text-black bg-white" 
          placeholder="Resposta" 
          onChange={e => setResposta(e.target.value)} 
          required 
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded">Salvar</button>
      </form>
    </div>
  )
}