'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GerenciarFAQ() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setloading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      }
    }
    checkSession()
  }, [router])

  useEffect(() => {
    fetchFaqs()
  }, [])

  async function fetchFaqs() {
    const { data } = await supabase
      .from('faq')
      .select('*')
      .order('ordem', { ascending: true })
    if (data) setFaqs(data)
    setloading(false)
  }

  async function handleDelete(id: number) {
    if (confirm("Deseja excluir essa pergunta?")) {
      const { error, status } = await supabase
        .from('faq')
        .delete()
        .eq('id', id)
      if (error || (status !== 200 && status !== 204 && status !== 201)) {
        alert("Erro ao excluir: " + (error?.message || "Operação não permitida"))
      } else {
        setFaqs(faqs.filter(f => f.id !== id))
        alert("Excluído com sucesso!")
      }
    }
  }

  return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Gerenciar FAQ</h1>
        <div className="flex gap-4">
          <Link href="/admin/dashboard" className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
            Voltar
          </Link>
          <Link href="/admin/faq/novo" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            + Nova Pergunta
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? <p>Carregando...</p> : faqs.map(faq => (
          <div key={faq.id} className="bg-white p-4 rounded shadow-sm border-l-4 border-[#D4C3A1] flex justify-between items-center">
            <div>
              <p className="font-bold text-black">{faq.pergunta}</p>
              <p className="text-gray-600 text-sm">{faq.resposta}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/faq/editar/${faq.id}`} className="text-blue-600 hover:underline">Editar</Link>
              <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:underline">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
