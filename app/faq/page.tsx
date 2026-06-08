"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsapp";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      const { data } = await supabase
        .from('faq')
        .select('*')
        .order('ordem', { ascending: true });
      if (data) setFaqs(data);
      setLoading(false);
    }
    fetchFaqs();
  }, []);

  return (
    <main className="min-h-screen bg-black-arch text-off-white">
      <Header />

      <div className="pt-[150px] pb-24 px-6">
        <div className="container mx-auto max-w-[800px]">
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-off-white mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            FAQ
          </motion.h1>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center text-off-white/70">Carregando...</p>
            ) : faqs.length === 0 ? (
              <p className="text-center text-off-white/70">Nenhuma pergunta encontrada.</p>
            ) : (
              faqs.map((faq, index) => (
                <AccordionItem key={faq.id || index} faq={faq} index={index} />
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

// Componente Individual do Acordeão
function AccordionItem({ faq, index }: { faq: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-cinza-claro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? "text-areia-suave" : "text-off-white group-hover:text-areia-suave"}`}>
          {faq.pergunta || faq.question}
        </span>
        <span className="text-areia-suave ml-4 shrink-0">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-off-white/80 leading-relaxed text-base">
              {faq.resposta || faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}