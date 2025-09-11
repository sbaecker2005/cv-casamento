import { ImageHero } from '../components/ImageHero';
import CoupleStory from '../components/CoupleStory';
import { SectionDivider } from '../components/SectionDivider';
import { CTASection } from '../components/CTASection';
import { EVENT } from '../lib/event';

export function Home() {
  return (
    <main>
      <ImageHero />
      <section aria-labelledby="detalhes" className="relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 id="detalhes" className="text-3xl font-serif mb-6 text-brand-coffee-700">
              Detalhes do Evento
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-brand-coffee-700/80">
              <div className="md:col-span-2">
                <h3 className="font-serif text-xl mb-2 text-brand-coffee-500">Local</h3>
                <p className="text-sm leading-relaxed">
                  <strong>{EVENT.venue}</strong><br />
                  {EVENT.addressLine}<br />
                  {EVENT.cityState}
                </p>
                <div className="mt-4 space-y-1 text-xs">
                  <p><strong>Data:</strong> {EVENT.date}</p>
                  <p><strong>Horário:</strong> {EVENT.time} (chegar 30 min antes)</p>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-brand-coffee-500">Traje</h3>
                <p className="text-sm leading-relaxed">
                  Passeio completo. Tons naturais (verdes, beges, neutros) recomendados.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-brand-coffee-500">Mensagem</h3>
                <p className="text-sm leading-relaxed">
                  Sua presença torna nosso dia único. Obrigado por fazer parte desta história.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="font-serif text-xl mb-4 text-brand-coffee-500">Como chegar</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <iframe
                  title="Mapa do local"
                  src={EVENT.gmapsEmbed}
                  className="w-full h-72 rounded-2xl border"
                  loading="lazy"
                />
                <div className="text-sm space-y-4">
                  <p>
                    Utilize o mapa ou abra no Google Maps para rotas e tempo estimado.
                  </p>
                  <a
                    href={EVENT.gmapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-brand-coffee-500 hover:text-brand-coffee-700"
                  >
                    Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  <SectionDivider className="mt-20" />
  <CoupleStory />
  <SectionDivider flip />
      <CTASection />
    </main>
  );
}
