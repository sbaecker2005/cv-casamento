import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section
      aria-labelledby="cta-titulo"
      className="relative py-20 px-6"
    >
      <div className="absolute inset-0 bg-radial-soft from-white/70 to-transparent" />
      <div className="relative max-w-4xl mx-auto text-center glass rounded-3xl p-10 shadow-2xl">
        <h2 id="cta-titulo" className="text-4xl font-serif mb-4">
          Vai celebrar conosco?
        </h2>
        <p className="text-brand-coffee-700/80 max-w-2xl mx-auto mb-10">
          Sua presença ilumina o nosso dia especial. Confirme já ou, se preferir, envie um presente via PIX com todo carinho.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <Link
            to="/rsvp"
            className="btn-sage text-lg shadow-lg shadow-brand-sage-900/20"
            aria-label="Confirmar presença agora"
          >
            Confirmar Presença
          </Link>
            <Link
              to="/pix"
              className="btn-coffee text-lg shadow-lg shadow-brand-coffee-900/20"
              aria-label="Ir para página PIX"
            >
              Chave PIX
            </Link>
        </div>
      </div>
    </section>
  );
}
