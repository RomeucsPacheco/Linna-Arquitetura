"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section id="localizacao" className="relative h-[450px] w-full bg-black-arch mt-0">
      
      <div className="absolute inset-0 z-0">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.296858564567!2d-50.39201192363762!3d-26.17728866380637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e6616540605963%3A0x673477033475253e!2sR.%20Mal.%20Floriano%2C%20502%20-%20Centro%2C%20Canoinhas%20-%20SC%2C%2089460-000!5e0!3m2!1spt-BR!2sbr!4v1709230000000!5m2!1spt-BR!2sbr"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "none" }}
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="container mx-auto px-6 h-full flex items-center relative z-10 pointer-events-none">
        <motion.div 
            className="bg-cinza-medio border border-cinza-claro p-8 rounded-lg max-w-[380px] w-full shadow-2xl pointer-events-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} // <--- CORRIGIDO
            transition={{ duration: 0.8 }}
        >
            <h4 className="text-2xl font-bold text-off-white mb-3">Nosso Espaço</h4>
            <p className="text-areia-suave mb-6 text-base leading-relaxed">
                Venha nos visitar e tomar um café. Estamos prontos para transformar suas ideias em realidade.
            </p>
            <div className="mb-6 text-off-white/90 text-sm leading-relaxed">
                <strong className="text-white block mb-1">Endereço:</strong>
                Rua Marechal Floriano, 502<br />
                Centro, Canoinhas - SC
            </div>
            <a 
                href="https://www.google.com/maps/dir//R.+Mal.+Floriano,+502+-+Centro,+Canoinhas+-+SC,+89460-000" 
                target="_blank" 
                className="inline-block px-6 py-2 border border-areia-suave text-areia-suave text-sm font-semibold tracking-widest uppercase hover:bg-areia-suave hover:text-black-arch transition-all duration-300 rounded-[4px]"
            >
                Como Chegar
            </a>
        </motion.div>
      </div>

    </section>
  );
}