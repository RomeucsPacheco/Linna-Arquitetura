import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonte para títulos e destaques
const spaceGrotesk = localFont({
  src: "../public/fonts/Para títulos e textos de destaque/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-title",
});

// Fonte para subtítulos e textos corridos
const almarenaMono = localFont({
  src: "../public/fonts/Para subtítulos e textos corridos/almarena-mono-light.otf",
  variable: "--font-sans-custom",
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
      {/* Aqui aplicamos as variáveis das fontes locais e a cor de fundo */}
      <body className={`${almarenaMono.variable} ${spaceGrotesk.variable} font-sans bg-black-arch text-off-white antialiased`}>
        {children}
      </body>
    </html>
  );
}