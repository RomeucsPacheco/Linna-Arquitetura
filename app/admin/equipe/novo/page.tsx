'use client'

import { useState } from "react"
import {supabase} from '@/lib/supabaseClient'
import { useRouter } from "next/navigation"

export default function NovoMembro() {
    const router = useRouter()
    const [loading, setLoading] =  useState(false)
    const [nome, setNome] = useState('')
    const [cargo, setCargo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [foto, setFoto] = useState<File | null>(null)
    
    const handleSalvarMembro =  async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        let urlPublica = ''

        // Upload da foto de perfil (se houver)
        if (foto) {
            const fileName = `equipe/${Date.now()}-${foto.name}`
            const { data: uploadData } = await supabase.storage
            .from('fotos-projetos') //usando o mesmo bucket por simplicidade
            .upload(fileName, foto)

            if (uploadData) {
                const { data } = supabase.storage.from('fotos-projetos').getPublicUrl(fileName)
                urlPublica = data.publicUrl
            }
        }
        
        // Salvar no banco de dados (Entidade membro_equipe)
        const { error } = await supabase
        .from('membro_equipe')
        .insert([{ nome, cargo, foto_url: urlPublica, descricao: descricao }])

        if (error) {
            alert("Erro ao cadastrar membro: " + error.message)
        } else {
            alert("Membro da equipe adicionado!")
            router.push('/admin/dashboard') // ou para a listagem da equipe
        }
        setLoading(false)
    }

    return (
    <div className="p-10 bg-[#F5F5F0] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Adicionar Membro da Equipe</h1>
      
      <form onSubmit={handleSalvarMembro} className="bg-white p-8 rounded-lg shadow-sm space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input 
            className="w-full p-2 border rounded text-black bg-white" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo / Função</label>
          <input 
            className="w-full p-2 border rounded text-black bg-white" 
            value={cargo} 
            onChange={e => setCargo(e.target.value)} 
            required 
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Descrição / Bio</label>
            <textarea 
                className="w-full p-2 border rounded text-black bg-white h-24" 
                placeholder="Ex: Organiza cada detalhe com perfeição..." 
                value={descricao} 
                onChange={e => setDescricao(e.target.value)} 
                 />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setFoto(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            {loading ? 'Salvando...' : 'Salvar Membro'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 px-6 py-2 rounded text-black">Cancelar</button>
        </div>
      </form>
    </div>
  )
}