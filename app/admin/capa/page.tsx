'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function GerenciarCapa() {
    const [capaAtual, setCapaAtual] = useState<string | null>(null)
    const [novaCapa, setNovaCapa] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        async function fetchCapa() {
            const { data, error } = await supabase
                .from('hero_capa')
                .select('imagem_url')
                .eq('id', 1)
                .single()
            
            if (data && data.imagem_url) {
                setCapaAtual(data.imagem_url)
            }
            setFetching(false)
        }
        fetchCapa()
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setNovaCapa(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!novaCapa) return

        setLoading(true)

        try {
            // 1. Fazer upload para o Storage
            const fileExt = novaCapa.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('capas')
                .upload(filePath, novaCapa)

            if (uploadError) throw uploadError

            // 2. Obter a URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('capas')
                .getPublicUrl(filePath)

            // 3. Atualizar no banco de dados (tabela hero_capa, id = 1)
            const { error: dbError } = await supabase
                .from('hero_capa')
                .upsert({ id: 1, imagem_url: publicUrl })

            if (dbError) throw dbError

            alert("Capa atualizada com sucesso!")
            setCapaAtual(publicUrl)
            setNovaCapa(null)
            setPreview(null)

        } catch (error: any) {
            console.error(error)
            alert("Erro ao atualizar a capa: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    if (fetching) return <div className="p-10 bg-[#F5F5F0] min-h-screen text-black">Carregando...</div>

    return (
        <div className="p-10 bg-[#F5F5F0] min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black">Capa do Início</h1>
                    <p className="text-gray-500 text-sm">Gerencie a imagem de fundo principal do site</p>
                </div>
                <Link 
                    href="/admin/dashboard" 
                    className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Voltar
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-2xl text-black">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Capa Atual</label>
                        {capaAtual ? (
                            <img src={capaAtual} alt="Capa atual" className="w-full h-48 object-cover rounded border border-gray-200" />
                        ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 rounded border border-gray-200">
                                Nenhuma capa cadastrada (usando padrão).
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nova Capa</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#D4C3A1] outline-none"
                            required
                        />
                        {preview && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-2">Pré-visualização da nova capa:</p>
                                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded border border-gray-200" />
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || !novaCapa}
                        className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? "Salvando..." : "Salvar Nova Capa"}
                    </button>
                </form>
            </div>
        </div>
    )
}
