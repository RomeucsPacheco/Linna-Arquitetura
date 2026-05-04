import type { NextConfig } from "next";

// MUDANÇA AQUI: Usamos 'any' para o TypeScript parar de reclamar
const nextConfig: any = {
  devIndicators: {
    appIsrStatus: false, // Indicador de estático
    buildActivity: false, // Indicador de compilação (o raiozinho/N)
  },
};

export default nextConfig;