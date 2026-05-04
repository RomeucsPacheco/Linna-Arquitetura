'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function ListarEquipe() {
    const [membros, setMembros] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMembros()
    }, [])

    async function fetchMembros() {
        const { data, error} = await supabase
        .from('membro_equipe')
        .select('*')
        .order('nome', {ascending: true})

        if (data) setMembros(data)
            setLoading(false)
    }

    async function handleDelete(id: number, nome: string) {
        const confirmar = confirm(`Tem certeza que deseja remover ${nome} da equipe?`);
        if (confirmar) {
            const { error } = await supabase
            .from('membro_equipe')
            .delete()
            .eq('id', id);

            if (error) {
                alert("Erro ao excluir: " + error.message);
            } else {
                alert("Membro removido com sucesso!");
                fetchMembros(); //Atualiza a lista automaticamente
            }
        }
    }
    return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">Membros da Equipe</h1>
          <p className="text-gray-500 text-sm">Gerencie quem aparece no site</p>
        </div>
        <Link 
          href="/admin/equipe/novo" 
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          + Adicionar Membro
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-[#D4C3A1] text-black">
            <tr>
              <th className="p-4 w-20">Foto</th>
              <th className="p-4">Nome / Cargo</th>
              <th className="p-4">Descrição</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={4} className="p-10 text-center">Carregando membros...</td></tr>
            ) : membros.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-500">Nenhum membro cadastrado.</td></tr>
            ) : (
              membros.map((membro) => (
                <tr key={membro.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {membro.foto_url ? (
                      <img 
                        src={membro.foto_url} 
                        alt={membro.nome} 
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">N/A</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-black">{membro.nome}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{membro.cargo}</div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                      {membro.descricao || "Sem descrição cadastrada."}
                    </p>
                  </td>
                  <td className="p-4 text-center space-x-3">
                    <Link href={`/admin/equipe/editar/${membro.id}`} className="text-blue-600 hover:underline text-sm font-medium">Editar</Link>
                    <button onClick={() => handleDelete(membro.id, membro.nome)} className="text-red-600 hover:underline text-sm font-medium">Excluir</button>
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