# medAgenda 🩺 — Sistema de Agendamento Médico

O **medAgenda** é um sistema completo e de alta fidelidade para agendamento e gerenciamento de consultas médicas. O projeto foi projetado com uma interface moderna e intuitiva, dividida em dois grandes portais de experiência do usuário: o **Portal do Paciente** (simulado em um frame mobile moderno) e o **Painel da Clínica** (uma interface administrativa completa para desktop).


---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores práticas e tecnologias modernas de desenvolvimento front-end:

*   **React 18 & Vite 6**: Ambiente de desenvolvimento rápido e otimizado com suporte a Hot Module Replacement (HMR).
*   **Tailwind CSS v4.0** (via `@tailwindcss/vite`): A versão mais recente do Tailwind, utilizando uma arquitetura CSS-first de alta performance para estilização rápida.
*   **React Router 7**: Roteamento dinâmico e flexível para controle de telas e parâmetros de URL.
*   **Motion (Framer Motion 12)**: Transições e micro-animações suaves para melhorar a experiência e interatividade.
*   **Recharts**: Biblioteca de gráficos interativos para exibição de análises e métricas de desempenho na clínica.
*   **Lucide React**: Biblioteca de ícones vetoriais modernos e consistentes.

---

## 📱 Funcionalidades do Projeto

### 1. Portal do Paciente (Interface Mobile)
O portal do paciente roda dentro de um simulador mobile (`MobileFrame`) integrado na tela, simulando a usabilidade de um aplicativo nativo para smartphones.
*   **Tela de Boas-vindas (Splash Screen)**: Apresentação animada da marca com acesso rápido.
*   **Fluxo de Cadastro**: Registro rápido do paciente com campos otimizados.
*   **Busca Inteligente**: Pesquisa de médicos por especialidade, proximidade ou nome.
*   **Agendamento Interativo**: Seleção de datas livres, horários disponíveis e confirmação de dados.
*   **Assistente IA de Triagem**: Chatbot simulado para ajudar o paciente a identificar a melhor especialidade médica com base em sintomas.
*   **Minhas Consultas**: Painel para acompanhar o status e histórico de consultas agendadas.
*   **Perfil do Paciente**: Gerenciamento de informações pessoais e histórico médico.

### 2. Painel da Clínica (Interface Desktop)
Um painel administrativo robusto e completo para a equipe da clínica gerenciar o fluxo diário de trabalho.
*   **Dashboard Executivo**: Resumo estatístico de consultas do dia, faturamento e novos pacientes.
*   **Módulo de Análises**: Gráficos de barra, linhas e pizza para análise de especialidades mais buscadas e taxas de ocupação.
*   **Gestão de Pacientes**: Lista de prontuários, contatos e histórico de atendimento de cada paciente.
*   **Calendário/Agenda Master**: Calendário completo com controle de horários de todos os médicos da clínica.
*   **Configurações do Sistema**: Parametrização de horários de funcionamento, especialidades atendidas e perfil da clínica.

---

## 📁 Estrutura de Pastas

A organização do código foi dividida por contextos e responsabilidades claras:

```text
medAgenda/
├── src/
│   ├── app/
│   │   ├── clinic/       # Telas, componentes e dados do Painel da Clínica
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   └── sections/  # Seções do dashboard (Dashboard, Analytics, Patients, etc.)
│   │   ├── patient/      # Telas e fluxos do Portal do Paciente (Home, Search, Assistant, etc.)
│   │   ├── layouts/      # Layouts estruturais (MobileLayout e FullPageLayout)
│   │   ├── App.jsx       # Componente raiz do aplicativo
│   │   ├── db.js         # Banco de dados simulado (mock data) com persistência local
│   │   └── routes.jsx    # Configuração de rotas de todo o sistema
│   ├── styles/           # Configurações globais de CSS, fontes e temas com Tailwind v4
│   └── main.jsx          # Ponto de entrada do React
├── index.html            # Estrutura HTML básica do app
├── package.json          # Manifesto do projeto e dependências
└── vite.config.js        # Configuração de build e aliases do Vite
```

---

## 💻 Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado em sua máquina.

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *O projeto abrirá localmente, geralmente no endereço [http://localhost:5173](http://localhost:5173).*

3.  **Gerar build de produção:**
    ```bash
    npm run build
    ```
