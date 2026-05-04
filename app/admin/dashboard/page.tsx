'use client'

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function DashBoardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    // Estados para os contadores reais
    const [stats, setStats] = useState({ projetos: 0, membros: 0, faqs: 0 })

    useEffect(() => {
        // RNF01: Proteção de rota e Busca de Dados
        const checkUserAndFetchData = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            
            if (!session) {
                router.push('/admin/login')
            } else {
                // Se estiver logado, buscamos os números reais
                const [resProj, resMembro, resFaq] = await Promise.all([
                    supabase.from('projeto').select('*', { count: 'exact', head: true }),
                    supabase.from('membro_equipe').select('*', { count: 'exact', head: true }),
                    supabase.from('faq').select('*', { count: 'exact', head: true })
                ])

                setStats({
                    projetos: resProj.count || 0,
                    membros: resMembro.count || 0,
                    faqs: resFaq.count || 0
                })

                setLoading(false)
            }
        }
        checkUserAndFetchData()
    }, [router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) return <div className="p-8 text-black bg-[#F5F5F0] min-h-screen">Carregando painel...</div>

    return (
        <div className="flex min-h-screen bg-[#F5F5F0]">
            {/* Menu Lateral - Preservado */}
            <aside className="w-64 bg-black text-white p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-10 tracking-widest text-[#D4C3A1]">LINNA</h2>
                <nav className="flex-1 space-y-4">
                    <button className="w-full text-left font-bold border-b border-[#D4C3A1] pb-2 text-[#D4C3A1]">Dashboard</button>
                    <Link href="/admin/projetos" className="w-full text-left hover:text-[#D4C3A1] transition-colors block">Projetos</Link>
                    <Link href="/admin/equipe" className="w-full text-left hover:text-[#D4C3A1] transition-colors block">Equipe</Link>
                    <Link href="/admin/faq" className="w-full text-left hover:text-[#D4C3A1] transition-colors block">FAQ</Link>
                </nav>
                <button 
                    onClick={handleLogout}
                    className="mt-auto text-left text-red-400 hover:text-red-300 transition-colors"
                >
                    Sair (Logout)
                </button>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500">Bem-vinda, Admin</p>
                </header>

                {/* Indicadores Rápidos - Agora com dados Reais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                        <span className="block text-4xl font-bold text-black">{stats.projetos}</span>
                        <span className="text-gray-500 uppercase text-xs tracking-widest">Projetos</span>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                        <span className="block text-4xl font-bold text-black">{stats.membros}</span>
                        <span className="text-gray-500 uppercase text-xs tracking-widest">Membros</span>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
                        <span className="block text-4xl font-bold text-black">{stats.faqs}</span>
                        <span className="text-gray-500 uppercase text-xs tracking-widest">FAQs</span>
                    </div>
                </div>

                {/* Log de Atividade Recente */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold mb-4 text-gray-700">Atividade Recente</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-[#F9F9F7] rounded border-l-4 border-black text-sm text-gray-600">
                            Bem-vinda de volta! O sistema está operando com dados reais.
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}