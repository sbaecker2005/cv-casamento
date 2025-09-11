import { COUPLE_STORY } from "@/content/couple";

export default function CoupleStory() {
  return (
    <section aria-labelledby="historia-casal" className="container mx-auto px-4 py-10">
      <h2 id="historia-casal" className="text-2xl md:text-3xl font-serif text-brand-coffee-700 mb-6 text-center">
        Nossa história em 4 fotos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COUPLE_STORY.map((p, i) => (
          <figure key={i} className="rounded-2xl overflow-hidden shadow bg-white flex flex-col">
            <div className="aspect-[4/5]">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-brand-graphite text-sm md:text-base">{p.title}</h3>
              <p className="mt-1 text-xs md:text-sm text-brand-graphite/80 leading-relaxed">{p.blurb}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}