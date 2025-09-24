import { useState } from 'react';

const PIX_KEY = '183.738.508.48'; // Chave PIX fallback atualizada

export function Pix() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative rounded-3xl overflow-hidden shadow-xl group">
          <img
            src=""
            alt="Imagem de destaque"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-sage-700/20 to-brand-coffee-700/10" />
        </div>
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-serif mb-4">Presentes via PIX</h1>
          <p className="text-brand-coffee-700/80 leading-relaxed mb-6">
            Caso deseje nos presentear, você pode usar a chave PIX abaixo (copia e cola) ou o QR Code.
            Agradecemos imensamente seu carinho!
          </p>
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl mb-2 text-brand-coffee-500">QR Code</h2>
              <div className="rounded-2xl border border-brand-coffee-300/50 p-6 bg-white flex flex-col items-center justify-center gap-3">
                {/* QR Code definitivo em /images/gallery/pic.png */}
                <img
                  src="/images/gallery/pic.png"
                  alt="QR Code para pagamento PIX"
                  loading="lazy"
                  decoding="async"
                  className="w-48 h-48 object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.25'; }}
                />
                <p className="text-[10px] text-brand-coffee-500/60">Se não aparecer, coloque a imagem em public/images/gallery/pic.png</p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-xl mb-2 text-brand-coffee-500">Chave (copia e cola)</h2>
              <div className="relative">
                <textarea
                  readOnly
                  aria-label="Código copia e cola PIX"
                  className="w-full rounded-2xl border border-brand-sage-100 bg-white px-4 py-3 text-sm font-mono leading-relaxed focus:outline-none focus:ring-4 focus:ring-brand-sage-600/40"
                  rows={4}
                  value={PIX_KEY}
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copiar código PIX"
                  className="absolute top-2 right-2 bg-brand-sage-500 hover:bg-brand-sage-600 text-white text-xs font-medium px-3 py-1 rounded-full focus:outline-none focus:ring-4 focus:ring-brand-sage-700"
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
            <p className="text-xs text-brand-coffee-500/70">
              Os valores serão usados com carinho em nossa nova jornada. Muito obrigado!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
