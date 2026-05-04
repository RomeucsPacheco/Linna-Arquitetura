"use client"; // <--- ADICIONE ESTA LINHA (Ela resolve o erro)

import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsapp";
import Image from "next/image";
import { motion } from "framer-motion";

export default function QuemSomos() {
  return (
    <main className="min-h-screen bg-black-arch text-off-white">
      <Header />

      {/* Espaçamento do Topo (Porque o Header é fixo) */}
      <div className="pt-[150px] pb-20 px-6">
        <div className="container mx-auto max-w-[900px] text-center">
          
          {/* Título */}
          <motion.h3 
            className="text-3xl md:text-[2.5em] font-bold text-off-white mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Quem Somos
          </motion.h3>

          {/* Grid da Equipe (Bruna e Marielen) */}
          <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16 mb-16">
            
            {/* Bruna */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border-[3px] border-cinza-claro mb-6">
                <Image 
                  src="/assets/img/pessoas/bruna.jpeg" 
                  alt="Bruna" 
                  fill 
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xl font-bold text-off-white mb-1">Bruna</h4>
              <p className="text-areia-suave">Arquiteta e sócia-fundadora</p>
            </motion.div>

            {/* Marielen */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border-[3px] border-cinza-claro mb-6">
                <Image 
                  src="/assets/img/pessoas/marielen.jpeg" 
                  alt="Marielen" 
                  fill 
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xl font-bold text-off-white mb-1">Marielen</h4>
              <p className="text-areia-suave">Designer e sócia-fundadora</p>
            </motion.div>

          </div>

          {/* Texto História */}
          <motion.div 
            className="max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl text-areia-suave/90 leading-relaxed italic">
              "No Linna, damos forma às ideias para transformar ambientes em
              espaços que conectam pessoas à essência da sua empresa. Acreditamos que
              arquitetura vai além da estética: é uma ferramenta para contar histórias, transmitir
              de forma visual e sensorial o que sua marca representa e criar cenários que
              fortalecem relações e concretizam negócios."
            </p>
          </motion.div>

        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}