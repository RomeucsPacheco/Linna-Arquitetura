# 🏛️ Linna Arquitetura - Painel Administrativo & Website

> "Espaços que inspiram pessoas."

Este projeto evoluiu de um site estático para uma **Aplicação Web Full Stack** de alta performance. Agora, além do frontend cinematográfico, a Linna Arquitetura possui um **Painel Administrativo** completo para gestão de conteúdo em tempo real.

## 🚀 Tecnologias (The Modern Full Stack)

O projeto utiliza o que há de mais moderno para garantir velocidade, segurança e facilidade de manutenção.

*   **Core:** [Next.js 15+](https://nextjs.org/) (App Router)
*   **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **Autenticação:** Supabase Auth (Proteção de rotas administrativas)
*   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animações:** [Framer Motion](https://www.framer.com/motion/)
*   **Segurança de Dados:** Row Level Security (RLS) no banco de dados.

## ✨ Funcionalidades do Painel Administrativo

O painel permite o controle total do site institucional sem a necessidade de mexer no código:

*   **Dashboard Dinâmico:** Indicadores em tempo real de projetos, membros e perguntas frequentes.
*   **Gestão de Portfólio (CRUD):** Cadastro, edição e exclusão de projetos com suporte a upload de imagens.
*   **Gestão de Equipe:** Controle dos perfis dos colaboradores, cargos e biografias.
*   **Central de FAQ:** Gerenciamento de perguntas e respostas para suporte ao cliente.
*   **Segurança:** Área administrativa protegida por login e senha.

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
*   Node.js (Versão 18 ou superior).
*   Conta no Supabase (Para o banco de dados).

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

3.  **Configuração de Ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do projeto e adicione suas chaves do Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
    ```

4.  **Rode o servidor:**
    ```bash
    npm run dev
    ```

## 📂 Estrutura do Projeto

*   **`app/admin/`**: Todo o ecossistema do painel administrativo (Login, Dashboard, Equipe, FAQ).
*   **`app/components/`**: Componentes reutilizáveis de interface.
*   **`lib/`**: Configurações de serviços externos (Cliente do Supabase).
*   **`public/assets/`**: Imagens e vídeos estáticos da marca.

## 🎨 Personalização

*   **Cores:** O tema utiliza as variáveis CSS `black-arch` e `areia-suave` definidas em `app/globals.css`.
*   **Segurança:** Todas as tabelas no Supabase possuem políticas de **RLS** ativadas para garantir que apenas o administrador possa alterar os dados.

---
Desenvolvido para o Projeto de Extensão II - Linna Arquitetura.
