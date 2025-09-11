import { useState } from 'react';

interface LocalForm {
  name: string;
  email: string;
  attending: 'sim' | 'nao';
  guests: number;
  message: string;
  phone: string;
}

export default function Rsvp() {
  const [formData, setFormData] = useState<LocalForm>({
    name: '',
    email: '',
    attending: 'sim',
    guests: 0,
    message: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: name === 'guests' ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    // Monta payload que o backend espera
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      attending: formData.attending === 'sim',
      companions: Math.min(Math.max(formData.guests, 0), 4),
      restrictions: formData.message.trim() || undefined
    };
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Falha ao enviar');
      setFeedback({ ok: true, msg: json.message || 'Presença registrada!' });
      setFormData({ name: '', email: '', attending: 'sim', guests: 0, message: '', phone: '' });
    } catch (err) {
      setFeedback({ ok: false, msg: err instanceof Error ? err.message : 'Erro inesperado' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-serif font-bold text-brand-coffee-700 mb-8 text-center">Confirme sua Presença</h1>

      {feedback && (
        <div className={(feedback.ok ? 'bg-brand-sage-100 border-brand-sage-500 text-brand-sage-700' : 'bg-red-100 border-red-500 text-red-700') + ' border px-4 py-3 rounded-lg mb-6 text-sm font-medium'}>
          {feedback.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg space-y-6">
        <div>
          <label htmlFor="name" className="block text-brand-graphite text-sm font-semibold mb-2">Nome Completo *</label>
          <input id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-brand-sage-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-600/30 focus:border-brand-sage-600" />
        </div>
        <div>
          <label htmlFor="email" className="block text-brand-graphite text-sm font-semibold mb-2">Email *</label>
          <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-brand-sage-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-600/30 focus:border-brand-sage-600" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-brand-graphite text-sm font-semibold mb-2">Telefone</label>
          <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(DDD) 90000-0000" className="w-full px-4 py-3 bg-white border border-brand-sage-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-600/30 focus:border-brand-sage-600" />
        </div>
        <div>
          <label htmlFor="attending" className="block text-brand-graphite text-sm font-semibold mb-2">Confirmação *</label>
          <select id="attending" name="attending" value={formData.attending} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-brand-sage-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-600/30 focus:border-brand-sage-600">
            <option value="sim">Estarei presente</option>
            <option value="nao">Não poderei comparecer</option>
          </select>
        </div>
        {formData.attending === 'sim' && (
          <div>
            <label htmlFor="guests" className="block text-brand-graphite text-sm font-semibold mb-2">Número de acompanhantes (0-4)</label>
            <input id="guests" name="guests" type="number" min={0} max={4} value={formData.guests} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-brand-sage-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-600/30 focus:border-brand-sage-600" />
          </div>
        )}
        <div>
          <label htmlFor="message" className="block text-brand-graphite text-sm font-semibold mb-2">Restrições / Mensagem (opcional)</label>
          <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="Ex: vegetariano, sem glúten..." className="w-full px-4 py-3 bg-white border border-brand-sage-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-600/30 focus:border-brand-sage-600 resize-none" />
        </div>
        <button disabled={loading} type="submit" className="w-full bg-brand-sage-500 hover:bg-brand-sage-600 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-sage-700 transition-all duration-200 hover:scale-105 active:scale-95">
          {loading ? 'Enviando...' : 'Confirmar Presença'}
        </button>
      </form>
    </div>
  );
}
