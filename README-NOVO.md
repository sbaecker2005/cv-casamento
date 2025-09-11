# Convite de Casamento - MonaLisa & João

Um site moderno e elegante para convite de casamento, desenvolvido com React, TypeScript e Tailwind CSS.

## ✨ Funcionalidades

- **Página inicial** com informações do evento
- **RSVP** para confirmação de presença
- **PIX** para presentes via transferência
- Design responsivo e elegante
- Interface moderna com animações suaves

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool rápido e moderno
- **React Router** - Roteamento para SPA

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd site-mamae
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

## 📦 Build para produção

```bash
npm run build
```

O projeto será construído na pasta `dist/`.

## 🎨 Personalização

### Cores
As cores principais podem ser modificadas no arquivo `tailwind.config.js`:
- `rose` - Cor principal do tema
- `champagne` - Cor de fundo alternativa

### Informações do evento
Edite os arquivos em `src/routes/` para personalizar:
- `Home.tsx` - Informações principais do evento
- `Rsvp.tsx` - Formulário de confirmação
- `Pix.tsx` - Chave PIX para presentes

### Fontes
O projeto usa as fontes:
- **Inter** - Fonte principal (sans-serif)
- **Playfair Display** - Fonte para títulos (serif)

## 📁 Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx
│   └── Footer.tsx
├── routes/             # Páginas da aplicação
│   ├── Home.tsx
│   ├── Rsvp.tsx
│   └── Pix.tsx
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🔧 Scripts disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build para produção
- `npm run preview` - Visualiza o build local

## 📝 Correções realizadas

1. **Dependências atualizadas** - Corrigido conflito de versões do React
2. **Estrutura simplificada** - Removida complexidade desnecessária
3. **Imports corrigidos** - Ajustadas importações CSS e componentes
4. **TypeScript** - Configuração otimizada
5. **Build funcional** - Projeto compilando sem erros

## 📞 Suporte

Para dúvidas ou problemas, entre em contato ou abra uma issue no repositório.

---

Feito com ❤️ para MonaLisa & João
