"use client";

// Lista de logos (Uma lista simples)
const logos = [
  "/assets/img/empresas/bandcalcados.png",
  "/assets/img/empresas/cabecagrande.png",
  "/assets/img/empresas/comfit.png",
  "/assets/img/empresas/garajao.png",
  "/assets/img/empresas/westrock.png",
  "/assets/img/empresas/zucco.png",
  "/assets/img/empresas/barbaradamaso.png",
  "/assets/img/empresas/burguer.png",
  "/assets/img/empresas/clinebeauty.png",
  "/assets/img/empresas/clinicadocelular.png",
  "/assets/img/empresas/arborgen.png",
  "/assets/img/empresas/dopedro.png",
  "/assets/img/empresas/gracie.png",
  "/assets/img/empresas/imobiliariacubas.png",
  "/assets/img/empresas/maisvisao.png",
  "/assets/img/empresas/srcaramelo.png",
  "/assets/img/empresas/dermale.png",
  "/assets/img/empresas/donarosa.png",
  "/assets/img/empresas/flordesal.png",
  "/assets/img/empresas/garden.png",
];

export default function SocialProof() {
  return (
    <section className="bg-areia-suave py-10 overflow-hidden border-none relative z-10">
      
      {/* Título Estilo Antigo (Centralizado e Simples) */}
      <div className="container mx-auto text-center mb-10">
        <h4 className="text-xl md:text-2xl font-bold text-black-arch relative inline-block pb-3">
          Marcas que confiam em nosso trabalho
          {/* Linha pequena abaixo */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-ambar rounded-full"></span>
        </h4>
      </div>

      {/* Carrossel Infinito Simples */}
      <div className="relative w-full overflow-hidden">
        {/* Usa a animação CSS puro 'scrollInfinito' definida no globals.css */}
        <div 
            className="flex items-center gap-16 min-w-max pause-hover"
            style={{ animation: "scrollInfinito 60s linear infinite" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="relative flex items-center justify-center px-4">
              <img
                src={logo}
                alt={`Logo Cliente ${index}`}
                className="w-auto h-[80px] md:h-[100px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}