"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { number: "01", title: "Briefing", text: "Conversamos sobre a identidade da sua marca, estilos, necessidades funcionais e o resultado que você espera." },
  { number: "02", title: "Concepção", text: "Começamos a desenhar as ideias para retratar o conceito da sua marca, criando um ambiente bonito e funcional." },
  { number: "03", title: "Apresentação", text: "Mostramos o seu projeto por meio de imagens, plantas e referências visuais." },
  { number: "04", title: "Revisão", text: "Ouvimos suas observações para adaptar o projeto, garantindo que ele corresponda às suas expectativas." },
  { number: "05", title: "Projeto Executivo", text: "Com a proposta aprovada, desenvolvemos os desenhos técnicos que asseguram a execução correta." },
  { number: "06", title: "Orçamentos", text: "Auxiliamos na definição de materiais e fornecedores, equilibrando qualidade, custo e prazo." },
  { number: "07", title: "Obra", text: "Estamos presentes em todas as etapas da execução para garantir qualidade e soluções quando necessário." },
  { number: "08", title: "Inauguração", text: "O processo se encerra com a obra finalizada e o seu espaço pronto para impulsionar o negócio." },
];

export default function Method() {
  const [currIndex, setCurrIndex] = useState(0);
  const numItems = steps.length;
  const anglePerItem = 360 / numItems; 
  const radius = 400; 

  const nextSlide = () => setCurrIndex((prev) => prev + 1);
  const prevSlide = () => setCurrIndex((prev) => prev - 1);
  const getMobileIndex = (idx: number) => ((idx % numItems) + numItems) % numItems;
  const mobileStep = steps[getMobileIndex(currIndex)];

  return (
    <motion.section 
      id="metodo" 
      className="bg-cinza-escuro py-12 md:py-20 px-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} // <--- CORRIGIDO
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto text-center h-auto md:h-[700px] flex flex-col justify-between">
        
        <div className="mb-8 md:mb-4 relative z-10 flex justify-center">
            <h3 className="text-2xl md:text-[2.5em] font-bold text-off-white flex items-center gap-4">
                Nosso Método
                <span className="inline-block w-2 h-2 md:w-3 md:h-3 border-t-[3px] border-r-[3px] border-areia-suave rotate-45 mt-1" />
            </h3>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex relative w-full h-full items-center justify-center perspective-[1200px] mt-10">
          <motion.div
            className="relative w-[280px] h-[350px]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: currIndex * -anglePerItem }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            {steps.map((step, index) => {
              const angle = index * anglePerItem;
              const normalizedRotation = (currIndex * -anglePerItem) % 360;
              const effectiveAngle = (angle + normalizedRotation + 360) % 360;
              
              let opacity = 0.3;
              if (effectiveAngle < 30 || effectiveAngle > 330) opacity = 1;
              if (effectiveAngle > 90 && effectiveAngle < 270) opacity = 0;

              return (
                <div
                  key={index}
                  className="absolute inset-0 bg-cinza-medio border border-cinza-claro rounded-lg p-8 text-left backface-hidden transition-opacity duration-500"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    opacity: opacity
                  }}
                >
                  <span className="block text-4xl font-bold text-areia-suave mb-4">{step.number}</span>
                  <h4 className="text-xl font-semibold text-off-white mb-4">{step.title}</h4>
                  <p className="text-areia-suave/80 text-sm leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden w-full h-[300px] relative flex items-center justify-center">
            <div className="bg-cinza-medio border border-cinza-claro rounded-lg p-6 text-left w-full max-w-[320px] shadow-lg">
                <span className="block text-3xl font-bold text-areia-suave mb-3">{mobileStep.number}</span>
                <h4 className="text-lg font-semibold text-off-white mb-3">{mobileStep.title}</h4>
                <p className="text-areia-suave/80 text-sm leading-relaxed">{mobileStep.text}</p>
            </div>
        </div>

        {/* CONTROLES */}
        <div className="flex justify-center gap-6 mt-8 md:mt-10 z-20">
          <button onClick={prevSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-areia-suave text-areia-suave flex items-center justify-center hover:bg-areia-suave hover:text-black-arch transition-all duration-300 hover:scale-110 active:scale-95">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-areia-suave text-areia-suave flex items-center justify-center hover:bg-areia-suave hover:text-black-arch transition-all duration-300 hover:scale-110 active:scale-95">
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </motion.section>
  );
}