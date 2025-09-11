import { useState } from "react";

export default function Rsvp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'sim',
    guests: 0,
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log('Dados do formulário:', formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-rose-800 mb-6 text-center font-serif">Confirme sua Presença</h2>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Confirmação enviada com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
          />
        </div>

        <div>
          <label htmlFor="attending" className="block text-gray-700 text-sm font-bold mb-2">
            Confirmação *
          </label>
          <select
            id="attending"
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
          >
            <option value="sim">Estarei presente</option>
            <option value="nao">Não poderei comparecer</option>
          </select>
        </div>

        {formData.attending === 'sim' && (
          <div>
            <label htmlFor="guests" className="block text-gray-700 text-sm font-bold mb-2">
              Número de acompanhantes
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="0"
              max="5"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Mensagem (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-rose-500"
            placeholder="Deixe uma mensagem especial para os noivos..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
        >
          Confirmar Presença
        </button>
      </form>
    </div>
  );
}
