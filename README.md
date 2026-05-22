# Poke Results 🎮🔍

Poke Results é um jogo dinâmico e interativo estilo "Wordle" para adivinhar Pokémons com base em seus atributos físicos, tipos biológicos e gerações. O jogo foi desenvolvido utilizando as melhores práticas de engenharia de software frontend modernas: **React, TypeScript, Zustand, TanStack Query, Tailwind CSS, Framer Motion e Vitest**.

---

## 🛠️ Stack Tecnológica

- **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite](https://vite.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com design premium e responsivo (estilo Glassmorphism escuro, gradientes HSL vibrantes e bordas translúcidas).
- **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand) para o estado global reativo do motor de jogo.
- **Requisições & Cache**: [TanStack Query v5 (React Query)](https://tanstack.com/query/latest) para integração inteligente e de baixa latência com a **PokeAPI**.
- **Animações**: [Framer Motion](https://www.framer.com/motion/) para transições fluidas e micro-interações de alta fidelidade.
- **Testes**: [Vitest](https://vitest.dev/) para testes rápidos de integração de estado e unitários de lógica de jogo.

---

## 📂 Estrutura de Diretórios

```
pokeresults/
├── src/
│   ├── api/                   # Integração com serviços de API externos (PokeAPI)
│   ├── components/            # Componentes de UI genéricos (Button, Input, etc.)
│   ├── features/              # Funcionalidades modulares encapsuladas
│   │   ├── game/              # Lógica de comparação, GuessInput e GuessDisplay
│   │   └── pokemon/           # Componente de revelação com silhueta e artwork oficial
│   ├── store/                 # Gerenciamento de estado global (Zustand Store)
│   ├── types/                 # Definições de tipos estritas do TypeScript
│   ├── utils/                 # Lista otimizada de nomes de Pokémons e helpers de CSS
│   ├── App.tsx                # Layout principal e orquestração do jogo
│   ├── index.css              # Variáveis CSS Globais e setup do Tailwind
│   └── main.tsx               # Ponto de entrada do React
├── tsconfig.json              # Configurações estritas do TypeScript (noUnusedLocals, etc.)
├── tailwind.config.js         # Tokens de design do Tailwind (azul/amarelo Pokémon)
├── vite.config.ts             # Configurações rápidas de bundle do Vite
└── package.json               # Dependências e scripts de execução
```

---

## 🚀 Como Iniciar Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`.

### Passo 3: Executar Testes Automatizados
O projeto conta com cobertura completa para testes unitários da lógica de jogo e testes de integração da Zustand store.
```bash
npm run test
```

### Passo 4: Compilar para Produção (Build)
```bash
npm run build
```
O build final otimizado será gerado na pasta `dist/`.

---

## ♿ Acessibilidade (A11y / WCAG)
O jogo possui suporte completo a acessibilidade seguindo as diretrizes WCAG:
- Atributos **ARIA** semânticos (`combobox`, `listbox`, `option`, `table`, `row`, `cell`, `columnheader`, `rowgroup`).
- Navegação completa por teclado (setas para navegar no Autocomplete, `Enter` para selecionar, `Escape` para fechar).
- Suporte a leitores de tela com `aria-activedescendant` dinâmico e `aria-live="polite"` para anúncio automático da revelação do Pokémon.
- Anúncios detalhados em `aria-label` para o histórico de palpites detalhando a diferença de peso, altura, tipo e geração de forma falada.

---

## 🌐 Deploy em Produção (Recomendado)

### Opção 1: Vercel (Recomendado)
A Vercel é a plataforma padrão sênior recomendada para projetos baseados em Vite devido ao suporte nativo de CD e CDN global:
1. Instale o CLI da Vercel globalmente ou use o site da Vercel conectando ao seu repositório Git.
2. Com o CLI, rode na raiz do projeto:
   ```bash
   vercel
   ```
3. A Vercel detectará automaticamente o framework Vite e configurará os comandos de Build (`npm run build`) e Output Directory (`dist`).

### Opção 2: Netlify
1. Conecte seu repositório no dashboard da Netlify.
2. Defina as seguintes configurações de build:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Clique em **Deploy site**.
