# 🏛️ Linna Arquitetura - Website

> "Espaços que inspiram pessoas."

Este projeto é a versão moderna e de alta performance do site institucional da **Linna Arquitetura**, migrado de um site estático para uma aplicação web completa utilizando a stack mais atual do mercado.

## 🚀 Tecnologias (The Modern Stack)

O projeto foi desenvolvido focando em performance, escalabilidade e animações fluidas.

* **Core:** [Next.js 15+](https://nextjs.org/) (App Router) & [React](https://react.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Segurança e tipagem estática)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Design System utilitário e responsivo)
* **Animações:** [Framer Motion](https://www.framer.com/motion/) (Interações complexas, 3D e física)
* **Ícones:** [Lucide React](https://lucide.dev/)

## ✨ Funcionalidades e Destaques

* **Hero Cinematográfico:** Efeito Ken Burns (Zoom suave) e textos com revelação sequencial.
* **Carrossel 3D (Seção Método):** Um carrossel giratório com física realista para apresentar o processo de trabalho.
* **Efeito Tilt 3D (Quem Somos):** Fotos da equipe que reagem ao movimento do mouse com inclinação e reflexo dinâmico.
* **Drag-to-Scroll (Equipe):** Interface tátil para navegar pelos membros da equipe clicando e arrastando.
* **Marquee Infinito (Parceiros):** Faixa de logos com rolagem contínua e efeito de fade nas bordas.
* **Portfólio Interativo:** Cards com mini-galeria interna que permite navegar pelas fotos sem sair da página.
* **Performance:** Imagens otimizadas automaticamente pelo Next.js e carregamento inteligente de fontes (Montserrat).

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto em sua máquina local.

### Pré-requisitos

* Node.js instalado (Versão 18 ou superior recomendada).

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/miojo01/linna-arquitetura](https://github.com/miojo01/linna-arquitetura)
    cd linna-arquitetura
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📂 Estrutura do Projeto

* **`app/`**: Contém as páginas (`page.tsx`) e o layout global.
    * **`components/`**: Componentes reutilizáveis (Header, Hero, Services, etc.).
* **`public/assets/`**: Onde ficam todas as imagens (`img/`) e vídeos estáticos.
* **`app/globals.css`**: Configurações globais de estilo e variáveis de tema.

## 🎨 Personalização

* **Imagens:** Substitua os arquivos na pasta `public/assets/img` mantendo os mesmos nomes ou atualize os caminhos nos componentes (ex: `app/components/Team.tsx`).
* **Cores:** As cores da marca (`black-arch`, `areia-suave`, etc.) estão configuradas como variáveis CSS no arquivo `app/globals.css`.

---