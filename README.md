# Convite de Casamento — MonaLisa & João

Site minimalista e elegante para convite de casamento, confirmação de presença (RSVP) e contribuição via PIX.

## Como rodar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Rode em modo desenvolvimento:
   ```bash
   npm run dev
   ```
3. Build para produção:
   ```bash
   npm run build
   ```
4. Preview do build:
   ```bash
   npm run preview
   ```

## Onde editar textos, data, local e chave PIX

- **Textos principais**: `src/routes/Home.tsx`
- **Data/local**: `src/routes/Home.tsx` e `src/components/Footer.tsx`
- **Chave PIX**: `src/routes/Pix.tsx` (const `PIX_KEY`)
- **Nome/cidade PIX**: `src/routes/Pix.tsx`
- **Imagens**: coloque em `public/images/` e ajuste os nomes em `Home.tsx`

## Stack

- Vite + React + TypeScript
- TailwindCSS
- React Router v6
- qrcode.react
- react-hook-form + zod
- framer-motion (animações)

## Acessibilidade & UX

- HTML5 semântico, labels, aria-live, navegação por teclado, focos visíveis.
- Mensagens de erro/sucesso acessíveis.
- Imagens com alt.
- Metatags básicas em `index.html`.

## Personalização

- Paleta: champagne (#F7E7CE), verde sálvia (#A9B7A0), grafite (#2B2B2B), off-white.
- Tipografia serif para títulos, sans para corpo.
- Cards, botões e inputs arredondados, sombras suaves.

---

# Site Casamento (Vite + React + TS + Tailwind)

Rotas:
- /        (Home com Hero, Detalhes, Galeria, CTA)
- /rsvp    (Formulário RSVP integrado ao backend /api/rsvp)
- /pix     (QR + chave PIX copia e cola)

## Galeria
Opção A (recomendada): colocar imagens em src/assets/gallery (serão importadas via import.meta.glob).
Opção B: colocar imagens em public/gallery e ajustar a lista fallback em src/lib/gallery.ts.

Formatos aceitos: jpg, jpeg, png, webp, avif.

Para adicionar/remover: basta incluir/remover arquivos na pasta; rebuild recarrega.

## Estilos
Cores personalizadas (brand-sage, brand-coffee) em tailwind.config.cjs.
Fontes (Playfair Display / Inter) incluídas em index.html.

## Componentes principais
- ImageHero: Hero full-bleed com CTAs.
- GalleryMasonry + Lightbox: grade em colunas com zoom.
- CTASection: chamada final.
- SectionDivider: divisor SVG.
- FAB: atalhos laterais RSVP / PIX.

## Acessibilidade / Performance
- Imagens lazy + decoding async.
- Alt descritivo dinâmico (buildAlt()).
- Lightbox com navegação Esc / setas.
- Prefers-reduced-motion respeitado (transições simples via Framer Motion fallback suave).

## Ajustes
- Edite PIX_KEY em pages/Pix.tsx.
- Substitua /pix-qr.png pelo QR real (coloque em public/).
- Ajuste fallback de gallery se usar public/.

Bom hack e felicidades! 💒

---

Qualquer dúvida, edite os arquivos conforme sua necessidade!
