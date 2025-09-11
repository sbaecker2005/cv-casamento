import { useState } from "react";

export default function Pix() {
  const [copied, setCopied] = useState(false);
  const pixKey = "monalisa.joao@exemplo.com"; // Substitua pela chave PIX real

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-rose-800 mb-6 font-serif">Lista de Presentes</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-lg mb-4 text-gray-700">
          Sua presença é o nosso maior presente!
        </p>
        <p className="mb-6 text-gray-600">
          Mas se quiser nos presentear, pode contribuir via PIX. Qualquer valor é bem-vindo e será usado para começarmos nossa vida juntos.
        </p>
        
        <div className="bg-rose-50 p-4 rounded-lg border-2 border-rose-200 mb-4">
          <p className="text-sm text-gray-600 mb-2">Chave PIX:</p>
          <p className="font-mono text-lg font-semibold text-rose-800 break-all">{pixKey}</p>
          <button
            onClick={handleCopy}
            className="mt-3 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
          >
            {copied ? "Copiado!" : "Copiar chave PIX"}
          </button>
        </div>

        {copied && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Chave PIX copiada com sucesso!
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Como funciona:</h3>
          <ol className="text-sm text-gray-600 text-left list-decimal list-inside space-y-1">
            <li>Copie a chave PIX acima</li>
            <li>Abra o app do seu banco</li>
            <li>Vá em PIX e cole a chave</li>
            <li>Digite o valor que desejar</li>
            <li>Finalize a transferência</li>
          </ol>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Muito obrigado pelo carinho! ❤️
      </p>
    </div>
  );
}
