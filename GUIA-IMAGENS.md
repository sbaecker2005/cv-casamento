# Guia de Imagens para o Site de Casamento

## Estrutura de Pastas
```
public/
  images/
    hero-bg.jpg           # Imagem de fundo do hero (1920x1080 recomendado)
    placeholder.jpg       # Placeholder para imagens não encontradas
    fallback.jpg         # Fallback para erros de carregamento
    gallery/
      casal-1.jpg        # Primeira foto do casal
      casal-2.jpg        # Segunda foto do casal  
      casal-3.jpg        # Terceira foto do casal
    venue/
      local-1.jpg        # Foto do local - vista geral
      local-2.jpg        # Foto do local - jardim/cerimônia
      local-3.jpg        # Foto do local - recepção
```

## Especificações Recomendadas

### Imagem Hero (hero-bg.jpg)
- Resolução: 1920x1080px (Full HD)
- Formato: JPG
- Tamanho: < 500KB (otimizada)
- Conteúdo: Foto romântica do casal ou local

### Galeria (gallery/*.jpg)
- Resolução: 800x800px (quadrada)
- Formato: JPG
- Tamanho: < 200KB cada
- Conteúdo: Momentos especiais do casal

### Local (venue/*.jpg)
- Resolução: 800x600px (4:3)
- Formato: JPG
- Tamanho: < 300KB cada
- Conteúdo: Diferentes ângulos do local

### Placeholder/Fallback
- Resolução: 400x400px
- Formato: JPG
- Conteúdo: Imagem neutra ou logo

## Como Adicionar Suas Imagens

1. **Prepare as imagens** seguindo as especificações acima
2. **Renomeie os arquivos** conforme a estrutura
3. **Coloque na pasta correta** em `public/images/`
4. **Teste no navegador** para verificar se estão carregando

## Otimização de Imagens

### Ferramentas Online Gratuitas:
- **TinyPNG** - https://tinypng.com/
- **Squoosh** - https://squoosh.app/
- **Optimizilla** - https://imagecompressor.com/

### Dicas de Otimização:
- Use JPG para fotos com muitas cores
- Use PNG para imagens com transparência
- Comprima sempre mantendo qualidade visual
- Teste em diferentes dispositivos

## Componentes Disponíveis

### OptimizedImage
- Carregamento otimizado com placeholder
- Tratamento de erros automático
- Lazy loading por padrão

### ImageGallery  
- Grid responsivo de imagens
- Modal de visualização
- Navegação por teclado
- Suporte a legendas

### HeroSection
- Background responsivo
- Overlay configurável
- Conteúdo centralizado

## Próximos Passos

1. Adicione suas imagens nas pastas corretas
2. Atualize os arrays de dados nas páginas se necessário
3. Teste a galeria e o modal
4. Verifique performance no Google PageSpeed
5. Considere implementar lazy loading adicional se muitas imagens
