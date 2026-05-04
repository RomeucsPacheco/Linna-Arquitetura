"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    // CORREÇÃO: Só rola para o topo se NÃO tiver um # na URL.
    // Se tiver # (ex: /#servicos), deixa o navegador rolar até a seção correta.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}