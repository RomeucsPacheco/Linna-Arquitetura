'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ListarProjetos() {
  const [projetos, setProjetos] = useState<any[]>([])
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
    fetchProjetos()
  }, [])

  async function fetchProjetos() {
    const { data, error } = await supabase
      .from('projeto')
      .select('*')
      .order('data_projeto', { ascending: false })

    if (data) setProjetos(data)
  }

  async function handleDeleteProjeto(id: number, titulo: string) {
    const confirmar = confirm(`Deseja excluir o projeto "${titulo}"? Todas as fotos vinculadas também serão removidas.`);

    if (confirmar) {
      try {
        // 1. Buscar todas as fotos vinculadas ao projeto
        const { data: fotos } = await supabase
          .from('foto_projeto')
          .select('url')
          .eq('projeto_id', id);

        // 2. Extrair os caminhos e deletar do storage
        if (fotos && fotos.length > 0) {
          const filesToRemove = fotos.map(f => {
            const path = f.url.split('/public/fotos-projeto/')[1];
            return path ? decodeURIComponent(path) : null;
          }).filter(Boolean) as string[];

          if (filesToRemove.length > 0) {
            await supabase.storage.from('fotos-projeto').remove(filesToRemove);
          }

          // Fallback para caso as fotos estivessem no bucket plural
          const filesToRemoveOldBucket = fotos.map(f => {
            const path = f.url.split('/public/fotos-projetos/')[1];
            return path ? decodeURIComponent(path) : null;
          }).filter(Boolean) as string[];

          if (filesToRemoveOldBucket.length > 0) {
            await supabase.storage.from('fotos-projetos').remove(filesToRemoveOldBucket);
          }
        }
      } catch (e) {
        console.error("Erro ao deletar fotos do storage:", e);
      }

      const { error, status } = await supabase
        .from('projeto')
        .delete()
        .eq('id', id);

      if (error || (status !== 200 && status !== 204 && status !== 201)) {
        alert("Erro ao excluir projeto: " + (error?.message || "Operação não permitida"));
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
        <div className="flex gap-4">
          <Link
            href="/admin/dashboard"
            className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Voltar
          </Link>
          <Link
            href="/admin/projetos/novo"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            + Novo Projeto
          </Link>
        </div>
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