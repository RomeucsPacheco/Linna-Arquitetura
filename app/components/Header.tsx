"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Manifesto", href: "/#hero" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Serviços", href: "/#servicos" },
  { name: "Portfólio", href: "/#portfolio" },
  { name: "FAQ", href: "/faq" },
  { name: "Contato", href: "/#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-black-arch/90 backdrop-blur-md py-3 border-white/10" 
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      {/* CONTAINER HÍBRIDO:
          - Mobile (Padrão): w-full px-6 (Fixo, não anima largura)
          - Desktop (md:): Aplica a lógica de max-width que anima
      */}
      <div 
        className={`mx-auto flex items-center justify-between 
          w-full px-6 
          md:px-0 md:transition-all md:duration-500 md:ease-in-out
          ${scrolled 
            ? "md:max-w-[900px] md:px-4"  // Desktop Scrolled
            : "md:max-w-[95%] md:px-0"    // Desktop Top
        }`}
      >
        
        {/* === LOGO === */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-50"
        >
          <Link href="/" className="block group">
             <img 
               src="/assets/img/logos/logo-cabecalho.png" 
               alt="Linna Arquitetura" 
               className="h-[45px] md:h-[55px] w-auto object-contain transition-opacity duration-300 hover:opacity-60"
             />
          </Link>
        </motion.div>

        {/* === MENU DESKTOP === */}
        <nav className="hidden md:flex items-center gap-1"> 
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.1), duration: 0.5 }}
            >
              <Link
                href={item.href}
                className="
                  block px-[12px] py-[8px] 
                  text-[15px] font-semibold tracking-widest text-off-white uppercase
                  border border-transparent rounded-none subpixel-antialiased
                  transition-all duration-300
                  hover:border-off-white hover:text-white
                "
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* === BOTÃO MOBILE === */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="md:hidden text-off-white z-50 p-2 -mr-2" // Ajuste negativo para alinhar visualmente à direita
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </motion.button>
      </div>

      {/* === MENU MOBILE FULLSCREEN === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-screen bg-black-arch/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden z-40"
          >
              {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-off-white uppercase font-bold tracking-widest hover:text-areia-suave transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}