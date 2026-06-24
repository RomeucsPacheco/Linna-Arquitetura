"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section id="localizacao" className="relative h-[450px] w-full bg-black-arch mt-0">

      <div className="absolute inset-0 z-0">
        <iframe
          src="https://maps.google.com/maps?q=-26.1753889,-50.3936667&hl=pt-BR&z=17&output=embed"
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
          <h4 className="text-2xl font-title font-bold text-off-white mb-3">Nosso Espaço</h4>
          <p className="text-areia-suave mb-6 text-base leading-relaxed">
            Venha nos visitar e tomar um café. Estamos prontos para transformar suas ideias em realidade.
          </p>
          <div className="mb-6 text-off-white/90 text-sm leading-relaxed">
            <strong className="text-white block mb-1">Endereço:</strong>
            Rua Felipe Schmidt, N°130, Sala 02<br />
            Centro, Canoinhas - SC
          </div>
          <a
            href="https://www.google.com/maps/place/26%C2%B010'31.4%22S+50%C2%B023'37.2%22W/@-26.1753769,-50.3962402,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-26.1753769!4d-50.3936653?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="inline-block px-6 py-2 border border-areia-suave font-title text-areia-suave text-sm font-semibold tracking-widest uppercase hover:bg-areia-suave hover:text-black-arch transition-all duration-300 rounded-[4px]"
          >
            Como Chegar
          </a>
        </motion.div>
      </div>

    </section>
  );
}