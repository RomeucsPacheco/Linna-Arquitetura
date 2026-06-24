"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsapp";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- COMPONENTE MINI-CARROSSEL (CORRIGIDO: ZERO TREMIDA) ---
function ProjectCardCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Fallback image if no images are provided
  const validImages = images && images.length > 0 ? images : ["/assets/img/projetos/projeto1.jpg"];

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full group bg-black-arch">
      
      {/* Container das Imagens */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? "100%" : "-100%",
                opacity: 1,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (direction: number) => ({
                x: direction < 0 ? "100%" : "-100%",
                opacity: 1,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            // MUDANÇA AQUI: Trocamos 'spring' por 'tween' (movimento liso sem mola)
            transition={{
              x: { type: "tween", ease: "easeInOut", duration: 0.5 }, 
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image 
              src={validImages[currentIndex]}
              alt={`${title} - Imagem ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay Escuro */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

      {/* Controles apenas se houver mais de uma imagem */}
      {validImages.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black-arch/50 hover:bg-areia-suave hover:text-black-arch text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black-arch/50 hover:bg-areia-suave hover:text-black-arch text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Indicadores */}
      {validImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {validImages.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? "bg-areia-suave" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- PÁGINA PRINCIPAL (EXPORT DEFAULT OBRIGATÓRIO) ---
export default function PortfolioCompleto() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data: projetosData } = await supabase
        .from('projeto')
        .select('*')
        .order('data_projeto', { ascending: false });

      if (projetosData && projetosData.length > 0) {
        const { data: fotosData } = await supabase
          .from('foto_projeto')
          .select('*')
          .in('projeto_id', projetosData.map(p => p.id))
          .order('id', { ascending: true });

        const projetosComFotos = projetosData.map(p => {
          const fotosProjeto = fotosData?.filter(f => f.projeto_id === p.id).map(f => f.url) || [];
          return {
            ...p,
            images: fotosProjeto
          };
        });

        setProjects(projetosComFotos);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-black-arch text-off-white">
      <Header />

      <div className="pt-[150px] pb-24 px-6">
        <div className="container mx-auto max-w-[1100px]">
          
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-title font-bold text-off-white mb-6">
              Nosso Portfólio
            </h1>
            <p className="text-lg text-areia-suave max-w-2xl mx-auto">
              Cada projeto conta uma história única. Navegue pelas fotos para conhecer os detalhes.
            </p>
          </motion.div>

          <div className="flex flex-col gap-24">
            {loading ? (
              <div className="text-center text-off-white/70 py-10 text-xl">
                Carregando projetos...
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center text-off-white/70 py-10 text-xl">
                Nenhum projeto encontrado.
              </div>
            ) : (
              projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 items-stretch`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  
                  {/* LADO DA IMAGEM (COM CARROSSEL) */}
                  <div className="w-full md:w-1/2 h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-2xl bg-cinza-medio">
                    <ProjectCardCarousel images={project.images} title={project.titulo} />
                  </div>

                  {/* LADO DO TEXTO */}
                  <div className="w-full md:w-1/2 text-left flex flex-col justify-center space-y-6">
                    <div>
                      <span className="text-areia-suave text-sm font-title font-bold tracking-widest uppercase mb-2 block">
                        {project.localizacao ? `${project.localizacao}` : "Projeto"}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-title font-bold text-off-white">
                        {project.titulo}
                      </h2>
                    </div>
                    
                    <div className="h-[2px] w-20 bg-areia-suave/50"></div>

                    <p className="text-off-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                      {project.descricao}
                    </p>
                  </div>

                </motion.div>
              ))
            )}
          </div>

        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}