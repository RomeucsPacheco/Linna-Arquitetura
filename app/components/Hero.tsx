"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      {/* ======================================= */}
      {/* ====       BANNER INICIAL          ==== */}
      {/* ======================================= */}
      <section id="banner-inicial" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Ken Burns */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10" />
          <motion.img
            src="/assets/img/background-banner.png" 
            alt="Background"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 20, ease: "easeOut" }}
          />
        </div>

        {/* Logo Central */}
        {/* Responsividade: w-[80%] no mobile, max-w-[650px] no desktop */}
        <div className="relative z-20 w-[80%] max-w-[650px]">
          <motion.img 
            src="/assets/img/logos/logo-banner.png" 
            alt="Linna Arch. For Business"
            className="w-full h-auto drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </section>


      {/* ======================================= */}
      {/* ====       SEÇÃO MANIFESTO         ==== */}
      {/* ======================================= */}
      <section id="hero" className="bg-black-arch py-20 px-6 flex items-center justify-center text-center">
        {/* Container que segura o conteúdo: 100% largura no mobile, máx 800px no desktop */}
        <div className="w-full max-w-[800px]">
            
            {/* Título */}
            <motion.h2 
                className="text-3xl md:text-5xl font-bold text-off-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Espaços que inspiram pessoas
            </motion.h2>

            {/* Parágrafo */}
            <motion.p 
                className="text-lg md:text-xl text-off-white/80 w-full max-w-[600px] mx-auto mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Nossa missão é criar ambientes que impulsionam o seu negócio, unindo design sofisticado e funcionalidade. Somos especialistas em arquitetura comercial.
            </motion.p>

            {/* Vídeo Responsivo */}
            <motion.div 
                // aspect-video garante a proporção 16:9 perfeita em qualquer tela
                className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-2xl border border-white/5"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="/assets/video/ManifestoHorizontal.mp4" 
                    frameBorder="0" 
                    allowFullScreen
                ></iframe>
            </motion.div>

        </div>
      </section>
    </>
  );
}