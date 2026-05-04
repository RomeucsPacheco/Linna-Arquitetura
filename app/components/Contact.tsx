"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contato" className="bg-cinza-escuro py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1100px]">
        
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-center">
          
          {/* Coluna Esquerda */}
          <div className="text-center md:text-left">
            <motion.h3 
              className="text-2xl text-areia-suave font-semibold uppercase tracking-wider mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} // <--- CORRIGIDO
              transition={{ duration: 0.6 }}
            >
              Fale Conosco
            </motion.h3>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-off-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} // <--- CORRIGIDO
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Pronto para transformar seu espaço?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-areia-suave/80 leading-relaxed max-w-[500px] mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }} // <--- CORRIGIDO
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Nossa missão é criar ambientes que impulsionam o seu negócio. Envie-nos uma mensagem e vamos marcar um café para conversar sobre o seu projeto.
            </motion.p>
          </div>
          
          {/* Coluna Direita */}
          <div className="flex flex-col gap-5">
            <ContactCard 
              href="https://wa.me/5547996327232"
              delay={0.2}
              title="Inicie uma conversa"
              text="(47) 99632-7232"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
            />
            <ContactCard 
              href="mailto:linnaarquitetura@outlook.com"
              delay={0.3}
              title="Envie um E-mail"
              text="linnaarquitetura@outlook.com"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>}
            />
            <ContactCard 
              href="https://www.instagram.com/linnaarquitetura/?hl=pt-br"
              delay={0.4}
              title="Veja nosso trabalho"
              text="@linnaarquitetura"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}

function ContactCard({ href, icon, title, text, delay }: { href: string, icon: any, title: string, text: string, delay: number }) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-6 p-6 bg-cinza-medio border border-transparent rounded-lg group transition-all duration-300 hover:-translate-y-1 hover:bg-[#2a2a2a] hover:border-areia-suave text-left"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} // <--- CORRIGIDO
      transition={{ duration: 0.6, delay: delay }}
    >
      <div className="text-areia-suave group-hover:text-off-white transition-colors duration-300 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-off-white mb-1">{title}</h4>
        <p className="text-areia-suave/90 text-sm">{text}</p>
      </div>
    </motion.a>
  )
}