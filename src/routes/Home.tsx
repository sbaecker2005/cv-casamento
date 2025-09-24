import HeroSection from '../components/HeroSection';
import CoupleStory from '../components/CoupleStory';
import { EVENT } from "../lib/event";

export default function Home() {
  return (
    <div className="space-y-12">
  {/* Hero Section com imagem de fundo (opcional) */}
  <HeroSection backgroundImage="/images/gallery/img1.jpg">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
          {EVENT.couple}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow">
          {EVENT.date}
        </p>
        <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow">
          Estamos muito felizes em compartilhar este momento especial com vocês.
        </p>
      </HeroSection>

      <div className="container mx-auto px-4 space-y-12">
        {/* Card principal com detalhes do evento */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-6 text-brand-coffee-700 text-center">
            Detalhes do Evento
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center py-2 border-b border-brand-sage-100">
              <span className="font-semibold text-brand-graphite">Data:</span>
              <span className="text-brand-coffee-500">{EVENT.date.replace('Sábado, ', '')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-sage-100">
              <span className="font-semibold text-brand-graphite">Horário:</span>
              <span className="text-brand-coffee-500">{EVENT.time}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-sage-100">
              <span className="font-semibold text-brand-graphite">Local:</span>
              <span className="text-brand-coffee-500">{EVENT.venue}, {EVENT.cityState}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-brand-graphite">Traje:</span>
              <span className="bg-brand-sage-100 text-brand-sage-700 px-3 py-1 rounded-full text-sm font-medium">
                Passeio completo
              </span>
            </div>
          </div>
        </div>

  <CoupleStory />

        {/* Mapa/Local */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4 text-brand-coffee-700">
            Como Chegar
          </h2>
          <p className="text-brand-graphite/80 mb-4">
            {EVENT.venue}<br />
            {EVENT.addressLine}<br />
            {EVENT.cityState}
          </p>
          <div className="mb-4">
            <iframe
              title={`Mapa - ${EVENT.venue}`}
              src={EVENT.gmapsEmbed}
              className="w-full h-72 rounded-2xl border"
              loading="lazy"
            />
          </div>
          <a
            href={EVENT.gmapsLink}
            target="_blank"
            rel="noreferrer"
            className="underline text-brand-coffee-500 hover:text-brand-coffee-700"
          >
            Abrir no Google Maps
          </a>
        </div>

        {/* CTA sutil para ação via FABs */}
        <div className="text-center text-brand-coffee-500 text-sm">
          <p>Use os botões ao lado para confirmar sua presença ou contribuir via PIX ➤</p>
        </div>
      </div>
    </div>
  );
}
