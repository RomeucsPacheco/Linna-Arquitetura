'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from 'next/link'

export default function ListarProjetos() {
    const [projetos, setProjetos] = useState<any[]>([])

    useEffect(() => {
        fetchProjetos()
    }, [])

    async function fetchProjetos() {
        const{ data, error} = await supabase
        .from('projeto')
        .select('*')
        .order('data_projeto', { ascending: false })

        if (data) setProjetos(data)
    }

    async function handleDeleteProjeto(id: number, titulo: string) {
      const confirmar =  confirm(`Deseja excluir o projeto "${titulo}"? Todas as fotos vinculadas também serão removidas.`);

      if (confirmar) {
        const { error } = await supabase
        .from('projeto')
        .delete()
        .eq('id', id);

        if (error) {
          alert(" Erro ao excluir projeto: " + error.message);
        } else {
          //atualiza a interface removendo o item da lista
          setProjetos(prev => prev.filter(p => p.id !== id));
          alert("Projeto removido com sucesso")
        }
      }
    }

    return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none">Gerenciar Projetos</h1>
        <Link 
          href="/admin/projetos/novo" 
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          + Novo Projeto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 text-black bg-white focus:ring-2 focus:ring-[#D4C3A1] outline-none">
        <table className="w-full text-left">
          <thead className="bg-[#D4C3A1] text-black">
            <tr>
              <th className="p-4">Título</th>
              <th className="p-4">Localização</th>
              <th className="p-4">Data</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projetos.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">Nenhum projeto cadastrado.</td></tr>
            ) : (
              projetos.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50">
                  <td className="p-4">{proj.titulo}</td>
                  <td className="p-4">{proj.localizacao}</td>
                  <td className="p-4">{proj.data_projeto}</td>
                  <td className="p-4 text-center space-x-2">
                    <Link href={`/admin/projetos/editar/${proj.id}`} className="text-blue-600 hover:underline">Editar</Link>
                    <button onClick={() => handleDeleteProjeto(proj.id, proj.titulo)} className="text-red-600 hover:underline">Deletar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}