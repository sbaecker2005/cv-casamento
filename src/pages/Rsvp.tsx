import { useState } from 'react';
import { resolveImageBase } from '../lib/gallery';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  companions: number;
  restrictions?: string;
  attending: boolean;
}

export function Rsvp() {
  const bannerImg = resolveImageBase('img2') || resolveImageBase('img1');
  const [status, setStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    const form = new FormData(e.currentTarget);
    const data: FormData = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      companions: Number(form.get('companions') || 0),
      restrictions: String(form.get('restrictions') || ''),
      attending: form.get('attending') === 'true'
    };
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) throw json;
      setStatus({ type: 'ok', msg: json.message || 'Confirmado!' });
      e.currentTarget.reset();
    } catch (err: unknown) {
      const msg = typeof err === 'object' && err && 'message' in err ? String((err as { message?: string }).message) : 'Erro no envio.';
      setStatus({ type: 'err', msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={bannerImg || ''}
          alt="Banner RSVP"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
  <div className="absolute inset-0 bg-gradient-to-r from-brand-sage-700/70 to-brand-coffee-700/40" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white drop-shadow-lg">Confirmação de Presença</h1>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 shadow-2xl space-y-6"
          aria-label="Formulário de confirmação de presença"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-brand-coffee-500 mb-2">
                Nome Completo
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-xl border border-brand-sage-100 bg-white px-4 py-3 shadow-sm focus:ring-4 focus:ring-brand-sage-600/40 focus:outline-none"
                  placeholder="Seu nome"
                />
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-brand-coffee-500 mb-2">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-xl border border-brand-sage-100 bg-white px-4 py-3 shadow-sm focus:ring-4 focus:ring-brand-sage-600/40 focus:outline-none"
                  placeholder="voce@exemplo.com"
                />
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-brand-coffee-500 mb-2">
                Telefone
                <input
                  name="phone"
                  className="mt-1 w-full rounded-xl border border-brand-sage-100 bg-white px-4 py-3 shadow-sm focus:ring-4 focus:ring-brand-sage-600/40 focus:outline-none"
                  placeholder="(DDD) 90000-0000"
                />
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase text-brand-coffee-500 mb-2">
                Nº Acompanhantes
                <select
                  name="companions"
                  defaultValue="0"
                  className="mt-1 w-full rounded-xl border border-brand-sage-100 bg-white px-4 py-3 shadow-sm focus:ring-4 focus:ring-brand-sage-600/40 focus:outline-none"
                >
                  {[0,1,2,3,4].map(n => <option key={n}>{n}</option>)}
                </select>
              </label>
            </div>
            <div className="md:col-span-2">
              <fieldset className="space-y-3">
                <legend className="text-xs font-semibold tracking-wide uppercase text-brand-coffee-500">
                  Presença
                </legend>
                <div className="flex gap-4 flex-wrap">
                  <label className="flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-brand-sage-100 cursor-pointer hover:border-brand-sage-300 transition">
                    <input type="radio" name="attending" value="true" defaultChecked />
                    <span className="text-sm">Estarei Presente 💒</span>
                  </label>
                  <label className="flex items-center gap-2 bg-white rounded-full px-5 py-2 border border-brand-sage-100 cursor-pointer hover:border-brand-sage-300 transition">
                    <input type="radio" name="attending" value="false" />
                    <span className="text-sm">Não Poderei 😢</span>
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold tracking-wide uppercase text-brand-coffee-500 mb-2">
                Restrições Alimentares
                <textarea
                  name="restrictions"
                  rows={4}
                  className="mt-1 w-full rounded-2xl border border-brand-sage-100 bg-white px-4 py-3 shadow-sm focus:ring-4 focus:ring-brand-sage-600/40 focus:outline-none"
                  placeholder="Ex: vegetariano, sem glúten..."
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              disabled={loading}
              className="btn-sage font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Enviar confirmação"
            >
              {loading ? 'Enviando...' : 'Enviar Confirmação'}
            </button>
            {status && (
              <p
                role="status"
                className={`text-sm font-medium px-4 py-2 rounded-full ${
                  status.type === 'ok'
                    ? 'bg-brand-sage-500/15 text-brand-sage-700'
                    : 'bg-brand-coffee-500/15 text-brand-coffee-700'
                }`}
              >
                {status.msg}
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
