'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function NovoProjeto() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ titulo: '', localizacao: '', data: '', descricao: '', comentario: ''})
    const [files, setFiles] = useState<File[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        //criar o registro do projeto
        const { data: projeto, error: pError} = await supabase
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

            if(pError) {
                alert("Erro ao criar projeto");
                setLoading(false);
                return;
            }

            //uploado das fotos (RF08)

            for (const file of files) {
                const fileName = `${Date.now()}-${file.name}`
                const { data: uploadData, error: uError} = await supabase.storage
                    .from('fotos-projeto')
                    .upload(fileName, file)

                    if(uploadData) {
                        //pega a URL pública da foto
                        const { data: urlData } = supabase.storage.from('fotos-projetos').getPublicUrl(fileName)

                        //salvar a url na tabela de fotos viculada ao projeto
                        await supabase.from('foto_projeto').insert([{
                            projeto_id: projeto.id,
                            url: urlData.publicUrl
                        }])
                    }
            }
            alert("Projeto cadastrado com sucesso!")
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
            onChange={e => setFiles(Array.from(e.target.files || []))}
          />
        </div>

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