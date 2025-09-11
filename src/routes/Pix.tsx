import { useState } from "react";

// Página de PIX agora mostra diretamente o QR Code fornecido.
// Coloque a imagem real em public/images/pix-qrcode.png (substitua o placeholder criado).
export default function Pix() {
  const [copied, setCopied] = useState(false);
  // Mantemos a chave para fallback/cópia caso alguém prefira copiar manualmente
  const pixKey = "183.738.508.48"; // Chave PIX (fallback) atualizada

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-serif font-bold text-brand-coffee-700 mb-8">
        Lista de Presentes
      </h1>

      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg mb-8">
        <p className="text-xl mb-6 text-brand-graphite">Sua presença é o nosso maior presente!</p>
        <p className="mb-8 text-brand-graphite/80 leading-relaxed">
          Se quiser nos presentear, basta escanear o QR Code abaixo ou copiar a chave (opcional).
        </p>

        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-inner border border-brand-coffee-200 inline-block">
            {/* QR Code carregado de /images/gallery/pic.png */}
            <img
              src="/images/gallery/pic.png"
              alt="QR Code para contribuição via PIX"
              className="w-56 h-56 object-contain select-none"
              draggable={false}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const fallback = document.getElementById('pix-fallback');
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div id="pix-fallback" className="hidden max-w-xs text-center">
              <p className="text-xs text-brand-graphite/70 mb-2">(QR Code não encontrado — adicione a imagem em <code>public/images/gallery/pic.png</code>)</p>
              <p className="font-mono text-sm font-semibold text-brand-coffee-700 break-all">{pixKey}</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="bg-brand-coffee-500 hover:bg-brand-coffee-700 text-white font-semibold px-5 py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-coffee-700 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {copied ? "Chave copiada!" : "Copiar chave (fallback)"}
          </button>
        </div>

        {copied && (
          <div className="bg-brand-sage-100 border border-brand-sage-500 text-brand-sage-700 px-4 py-3 rounded-lg mb-6">
            Chave PIX copiada com sucesso!
          </div>
        )}

        <div className="bg-brand-sage-100 p-6 rounded-xl">
          <h3 className="font-serif font-semibold mb-4 text-brand-coffee-700">Como funciona:</h3>
          <ol className="text-sm text-brand-graphite/80 text-left list-decimal list-inside space-y-2 max-w-md mx-auto">
            <li>Abra o app do seu banco</li>
            <li>Toque em PIX &gt; Pagar</li>
            <li>Escaneie o QR Code acima</li>
            <li>Confira o nome e valor (ou digite o valor desejado)</li>
            <li>Confirme a transferência</li>
          </ol>
        </div>
      </div>

      <p className="text-brand-coffee-500 text-lg font-serif">Muito obrigado pelo carinho! ❤️</p>
    </div>
  );
}
