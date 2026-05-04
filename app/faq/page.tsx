"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsapp";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Perguntas e Respostas
const faqs = [
  {
    question: "Por que escolher a Linna Arquitetura?",
    answer: "Somos o único escritório da região especializado em projetos comerciais, focados em criar ambientes funcionais que valorizam sua marca e priorizam a experiência do cliente. Projetamos espaços únicos para conectar pessoas à essência da sua empresa."
  },
  {
    question: "Vocês fazem somente projetos comerciais?",
    answer: "Sim, desenvolvemos projetos para os mais variados estabelecimentos comerciais e corporativos e industriais, de suas recepções, setores de atendimento, áreas individuais e coletivas, criando ambientes funcionais e acolhedores para clientes e equipe."
  },
  {
    question: "Vocês fazem projeto arquitetônico?",
    answer: "Sim. Trabalhamos com projeto arquitetônico e seus complementares, mas principalmente projetos de interiores e fachadas."
  },
  {
    question: "Em que cidades vocês atendem? Realizam projetos à distância?",
    answer: "Atendemos Canoinhas e região presencialmente, mas também realizamos projetos à distância, com o mesmo padrão de qualidade e dedicação."
  },
  {
    question: "Como funciona o trabalho de vocês?",
    answer: "Nosso processo é dividido em 8 etapas. Você pode conferir todos os detalhes na seção 'Método'."
  },
  {
    question: "O que está incluso no valor do projeto?",
    answer: "No valor do projeto você recebe: • Projeto técnico completo e imagens realistas dos ambientes; • Visitas à obra, em número estipulado no orçamento de acordo com o porte do projeto. Caso seja necessário um acompanhamento mais frequente, é possível contratar visitas adicionais à parte ou acompanhamento de obra; • Entrega impressa do projeto; • Presentes especiais preparados para o cliente; • Auxílio na contratação de profissionais para a execução da obra; • Suporte contínuo para dúvidas de execução, que pode ser feito via WhatsApp ou em reuniões no escritório, garantindo acompanhamento mesmo após as visitas previstas."
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos Pix e parcelamento no boleto bancário. Posso pagar metade no início e metade apenas na entrega do projeto? Não conseguimos atrelar o pagamento à entrega, pois o andamento do projeto depende também de aprovações e retornos do cliente, o que pode gerar atrasos fora do nosso controle. Para garantir segurança e transparência, trabalhamos com contrato, prazos definidos e nos comprometemos com a qualidade em todas as etapas."
  },
  {
    question: "Vocês fazem somente a etapa de móveis soltos e decoração?",
    answer: "Sim. Além do projeto completo de interiores, também oferecemos a consultoria, ideal para quem busca valorizar o ambiente com soluções práticas e de menor custo. Essa modalidade não inclui o desenvolvimento técnico completo (plantas detalhadas e especificações), mas entrega uma solução visual e prática, perfeita para quem deseja atualizar os espaços, melhorar a estética e evitar grandes obras."
  },
  {
    question: "Gostei! Como posso contratar?",
    answer: "Entre em contato conosco na seção 'Contato' e preencha o formulário. Retornaremos o mais rápido possível para conversarmos sobre o seu projeto!"
  },
];

export default function FAQ() {
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
            {faqs.map((faq, index) => (
              <AccordionItem key={index} faq={faq} index={index} />
            ))}
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
          {faq.question}
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
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}