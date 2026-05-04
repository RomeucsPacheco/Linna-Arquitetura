"use client";

import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://api.whatsapp.com/send/?phone=5547996327232&text&type=phone_number&app_absent=0"
      target="_blank"
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-[#20b858] transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <img 
        src="/assets/img/icons/whatsappIcon.png" 
        alt="WhatsApp" 
        className="w-8 h-8 object-contain"
      />
    </motion.a>
  );
}