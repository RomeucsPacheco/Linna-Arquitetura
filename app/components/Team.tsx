"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const team = [
  { name: "Bruna", role: "Arquiteta & Sócia-Fundadora", desc: "Transforma projetos em experiências únicas, buscando equilíbrio entre criatividade e funcionalidade.", image: "/assets/img/pessoas/bruna.jpeg" },
  { name: "Marielen", role: "Arquiteta & Sócia-Fundadora", desc: "Organiza cada detalhe com perfeição. Fã de gatos e de universos onde a criatividade não tem limites.", image: "/assets/img/pessoas/marielen.jpeg" },
  { name: "Ariane", role: "Arquiteta Criativa", desc: "Transforma ideias em espaços acolhedores.", image: "/assets/img/pessoas/ariane.jpg" },
  { name: "Clarice", role: "Arquiteta Curiosa", desc: "Adora cores e criar sistemas para tornar o trabalho mais eficiente.", image: "/assets/img/pessoas/clarice.jpg" },
  { name: "Jony", role: "Consultor Tributário", desc: "Dono de uma mente inquieta, seu verdadeiro brilho não está nos palcos, mas nos bastidores.", image: "/assets/img/pessoas/jony.JPG" },
];

export default function Team() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <motion.section 
      id="equipe" 
      className="bg-cinza-escuro py-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} // <--- CORRIGIDO
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        
        {/* TÍTULO CENTRALIZADO (Igual ao HTML original) */}
        <div className="flex justify-center mb-12">
            <h3 className="text-3xl md:text-[2.5em] font-bold text-off-white flex items-center gap-4">
                Nossa Equipe
                <span className="inline-block w-3 h-3 border-b-[3px] border-r-[3px] border-areia-suave rotate-45 -mt-1" />
            </h3>
        </div>

        <div className="cursor-grab active:cursor-grabbing" ref={carousel}>
          <motion.div 
            className="flex gap-8"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="relative min-w-[300px] h-[450px] rounded-lg overflow-hidden border border-cinza-claro group"
                whileHover={{ borderColor: "var(--color-areia-suave)" }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 bg-gradient-to-t from-black-arch via-black-arch/60 to-transparent group-hover:via-black-arch/80">
                  <h4 className="text-2xl font-bold text-off-white mb-1">{member.name}</h4>
                  <h5 className="text-sm uppercase tracking-wider text-areia-suave mb-2 font-medium">{member.role}</h5>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-[150px] transition-all duration-500 ease-in-out">
                    <p className="text-sm text-off-white/80 leading-relaxed pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}