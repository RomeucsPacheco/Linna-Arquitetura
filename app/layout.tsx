import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; 
import "./globals.css";

// Configurando a Montserrat
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
  variable: "--font-montserrat", // Essa variável é lida lá no CSS novo
});

export const metadata: Metadata = {
  title: "Linna Arquitetura",
  description: "Espaços que inspiram pessoas.",
  icons: {
    icon: "/favicon.png", // Caminho direto para o arquivo na pasta public
    shortcut: "/favicon.png",
    apple: "/favicon.png", // Opcional: ícone para iPhone/iPad
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Aqui aplicamos a variável da fonte e a cor de fundo */}
      <body className={`${montserrat.variable} font-sans bg-black-arch text-off-white antialiased`}>
        {children}
      </body>
    </html>
  );
}