"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsapp";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- DADOS DOS PROJETOS ---
const projects = [
  {
    id: 1,
    title: "Barbearia Zucco",
    category: "Comercial e Interiores",
    location: "Canoinhas - SC",
    description: "A barbearia combina o clássico e o industrial em um ambiente robusto e acolhedor. Couro, madeira e metal estruturam a narrativa do espaço, enquanto peças garimpadas, de móveis a detalhes decorativos, trazem autenticidade e história para o conjunto. O resultado é uma barbearia com alma: funcional, elegante e cheia de personalidade.",
    images: [
      "/assets/img/projetos/projeto1.jpg",
      "/assets/img/projetos/barbearia zucco/1.jpg",
      "/assets/img/projetos/barbearia zucco/2.jpg",
      "/assets/img/projetos/barbearia zucco/3.jpg",
      "/assets/img/projetos/barbearia zucco/4.jpg",
      "/assets/img/projetos/barbearia zucco/5.jpg",
      "/assets/img/projetos/barbearia zucco/6.jpg",
      "/assets/img/projetos/barbearia zucco/7.jpg",
      "/assets/img/projetos/barbearia zucco/8.jpg",
      "/assets/img/projetos/barbearia zucco/9.jpg",
      "/assets/img/projetos/barbearia zucco/10.jpg",
      "/assets/img/projetos/barbearia zucco/11.jpg",
      "/assets/img/projetos/barbearia zucco/12.jpg",
      "/assets/img/projetos/barbearia zucco/13.jpg",
    ],
  },
  {
    id: 2,
    title: "Contabilidade Cabeça Grande",
    category: "Comercial e Interiores",
    location: "Canoinhas - SC",
    description: "Um escritorio nada convencional, aqui a estética contemporânea se une à inteligência funcional. Iluminação cênica, volumes marcantes e uma paleta profunda criam um ambiente profissional com personalidade. O projeto reforça a essência da marca: moderna, criativa e orientada a resultados.",
    images: [
      "/assets/img/projetos/cabeça grande/01.jpg",
      "/assets/img/projetos/cabeça grande/03.jpg",
      "/assets/img/projetos/cabeça grande/04.jpg",
      "/assets/img/projetos/cabeça grande/05.jpg",
      "/assets/img/projetos/cabeça grande/08.jpg",
      "/assets/img/projetos/cabeça grande/10.jpg",
      "/assets/img/projetos/cabeça grande/13.jpg",
      "/assets/img/projetos/cabeça grande/16.jpg",
      "/assets/img/projetos/cabeça grande/18.jpg",
      "/assets/img/projetos/cabeça grande/19.jpg",
    ],
  },
  {
    id: 3,
    title: "Garajão do Dog",
    category: "Comercial e Interiores",
    location: "Canoinhas - SC",
    description: "Um layout pensado para receber movimento: cores vibrantes, mix de materiais e uma área aberta que transforma o espaço em experiência. O Garajo ganhou identidade própria com iluminação estratégica, paisagismo suspenso e elementos gráficos que reforçam a personalidade urbana do projeto.",
    images: [
      "/assets/img/projetos/garajo/1.jpg",
      "/assets/img/projetos/garajo/2.jpg",
      "/assets/img/projetos/garajo/3.jpg",
      "/assets/img/projetos/garajo/4.jpg",
      "/assets/img/projetos/garajo/5.jpg",
      "/assets/img/projetos/garajo/6.jpg",
      "/assets/img/projetos/garajo/7.jpg",
      "/assets/img/projetos/garajo/8.jpg",
      "/assets/img/projetos/garajo/9.jpg",
      "/assets/img/projetos/garajo/10.jpg",
      "/assets/img/projetos/garajo/11.jpg",
      "/assets/img/projetos/garajo/12.jpg",
      "/assets/img/projetos/garajo/13.jpg",
    ],
  },
  
];

// --- COMPONENTE MINI-CARROSSEL (CORRIGIDO: ZERO TREMIDA) ---
function ProjectCardCarousel({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
              src={images[currentIndex]}
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

      {/* Controles */}
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

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              idx === currentIndex ? "bg-areia-suave" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// --- PÁGINA PRINCIPAL (EXPORT DEFAULT OBRIGATÓRIO) ---
export default function PortfolioCompleto() {
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
            <h1 className="text-4xl md:text-6xl font-bold text-off-white mb-6">
              Nosso Portfólio
            </h1>
            <p className="text-lg text-areia-suave max-w-2xl mx-auto">
              Cada projeto conta uma história única. Navegue pelas fotos para conhecer os detalhes.
            </p>
          </motion.div>

          <div className="flex flex-col gap-24">
            {projects.map((project, index) => (
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
                  <ProjectCardCarousel images={project.images} title={project.title} />
                </div>

                {/* LADO DO TEXTO */}
                <div className="w-full md:w-1/2 text-left flex flex-col justify-center space-y-6">
                  <div>
                    <span className="text-areia-suave text-sm font-bold tracking-widest uppercase mb-2 block">
                      {project.category} — {project.location}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-off-white">
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className="h-[2px] w-20 bg-areia-suave/50"></div>

                  <p className="text-off-white/80 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}