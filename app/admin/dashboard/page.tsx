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
    const [recentLogs, setRecentLogs] = useState<any[]>([])

    useEffect(() => {
        // RNF01: Proteção de rota e Busca de Dados
        const checkUserAndFetchData = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.push('/admin/login')
            } else {
                // Se estiver logado, buscamos os números reais e os últimos cadastros
                const [resProj, resMembro, resFaq, recentProj, recentMembro, recentFaq] = await Promise.all([
                    supabase.from('projeto').select('*', { count: 'exact', head: true }),
                    supabase.from('membro_equipe').select('*', { count: 'exact', head: true }),
                    supabase.from('faq').select('*', { count: 'exact', head: true }),
                    supabase.from('projeto').select('id, titulo').order('id', { ascending: false }).limit(2),
                    supabase.from('membro_equipe').select('id, nome').order('id', { ascending: false }).limit(2),
                    supabase.from('faq').select('id, pergunta').order('id', { ascending: false }).limit(2)
                ])

                setStats({
                    projetos: resProj.count || 0,
                    membros: resMembro.count || 0,
                    faqs: resFaq.count || 0
                })

                const logs: any[] = []
                if (recentProj.data) {
                    recentProj.data.forEach((p: any) => logs.push({ id: `p-${p.id}`, type: 'Projeto', desc: p.titulo }))
                }
                if (recentMembro.data) {
                    recentMembro.data.forEach((m: any) => logs.push({ id: `m-${m.id}`, type: 'Membro', desc: m.nome }))
                }
                if (recentFaq.data) {
                    recentFaq.data.forEach((f: any) => logs.push({ id: `f-${f.id}`, type: 'FAQ', desc: f.pergunta }))
                }
                setRecentLogs(logs)

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
                    <Link href="/admin/capa" className="w-full text-left hover:text-[#D4C3A1] transition-colors block">Capa do Site</Link>
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
                <header className="mb-10 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-500">Bem-vinda, Admin</p>
                    </div>
                    <Link href="/" target="_blank" className="bg-[#D4C3A1] text-black px-6 py-2 rounded-md hover:bg-[#c3b18f] transition-colors font-bold shadow-sm">
                        Ver o Site
                    </Link>
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
                    <h3 className="font-bold mb-4 text-gray-700">Últimos Cadastros</h3>
                    <div className="space-y-3">
                        {recentLogs.length > 0 ? recentLogs.map(log => (
                            <div key={log.id} className="p-3 bg-[#F9F9F7] rounded border-l-4 border-[#D4C3A1] text-sm text-gray-700 flex justify-between items-center">
                                <span><span className="font-bold">{log.type}:</span> {log.desc}</span>
                                <span className="text-xs text-gray-500 italic">Recente</span>
                            </div>
                        )) : (
                            <div className="p-3 bg-[#F9F9F7] rounded border-l-4 border-gray-300 text-sm text-gray-600">
                                Nenhum cadastro recente encontrado.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}