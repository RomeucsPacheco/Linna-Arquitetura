"use client";

import { motion } from "framer-motion";

const servicos = [
  {
    title: "Projeto Arquitetônico",
    description: "Criação do design completo de um novo edifício comercial, desde a concepção até a documentação técnica.",
  },
  {
    title: "Projeto de Interiores",
    description: "Planejamento e design de ambientes internos, otimizando o espaço para funcionalidade e estética.",
  },
  {
    title: "Projeto de Fachada",
    description: "Renovação e criação de fachadas que valorizam a identidade visual da sua empresa.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-cinza-escuro py-20 px-6">
      <div className="container mx-auto max-w-[1100px] text-center">
        
        {/* TÍTULO CENTRALIZADO */}
        <div className="flex items-center justify-center gap-5 mb-10">
          <motion.div 
            className="h-[2px] bg-areia-suave flex-grow max-w-[250px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} // <--- CORRIGIDO: Só anima uma vez
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            style={{ transformOrigin: "right" }} 
          />

          <motion.h3 
            className="text-3xl md:text-[2.5em] font-bold text-off-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} // <--- CORRIGIDO
            transition={{ duration: 0.8 }}
          >
            Nossos Serviços
          </motion.h3>

          <motion.div 
            className="h-[2px] bg-areia-suave flex-grow max-w-[250px]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} // <--- CORRIGIDO
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            style={{ transformOrigin: "left" }} 
          />
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {servicos.map((item, index) => (
            <motion.div
              key={index}
              className="bg-cinza-medio p-8 rounded-lg border border-transparent hover:border-white/10 transition-colors"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }} // <--- CORRIGIDO
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h4 className="text-xl font-bold text-off-white mb-4">{item.title}</h4>
              <p className="text-areia-suave leading-relaxed text-[0.95rem]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}