// Resolver simples baseado em imagens em public/images/gallery/*.jpg
// Vite serve /public na raiz, então /images/... funciona em dev e build

export function resolveImageBase(name: string): string | null {
  const base = name.toLowerCase().replace(/\s+/g, '');
  return `/images/gallery/${base}.jpg`; // assumindo .jpg conforme assets atuais
}

export const gallery = ['img1','img2','img3','img4'].map((n) => ({ name: n, src: resolveImageBase(n)! }));

// Helpers de compatibilidade (caso componentes antigos usem)
export const galleryImages = gallery.map(g => g.src);
export function buildAlt(_src: string, index: number) {
  return `Foto ${index + 1}`;
}
