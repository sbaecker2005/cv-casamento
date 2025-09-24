import { useState, useEffect } from 'react';

/**
 * Interface para convidado confirmado
 */
export interface ConfirmedGuest {
  id: number;
  name: string;
  email: string;
  companions: number;
  created_at: string;
}

/**
 * Interface para resposta da API
 */
interface ApiResponse {
  success: boolean;
  count: number;
  data: ConfirmedGuest[];
}

/**
 * Hook para buscar lista de convidados confirmados
 */
export function useConfirmedGuests() {
  const [guests, setGuests] = useState<ConfirmedGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPeople, setTotalPeople] = useState(0);

  const fetchConfirmedGuests = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/rsvp/confirmed');
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
      }
      const data: ApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error('Erro ao buscar convidados confirmados');
      }

      setGuests(data.data);
      
      // Calcular total de pessoas (convidados + acompanhantes)
      const total = data.data.reduce((sum, guest) => sum + 1 + guest.companions, 0);
      setTotalPeople(total);

    } catch (err) {
      console.error('Erro ao buscar convidados confirmados:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Buscar dados na montagem do componente
  useEffect(() => {
    fetchConfirmedGuests();
  }, []);

  // Função para atualizar a lista manualmente
  const refresh = () => {
    fetchConfirmedGuests();
  };

  return {
    guests,
    loading,
    error,
    totalPeople,
    totalGuests: guests.length,
    refresh
  };
}

/**
 * Componente para exibir lista de convidados confirmados
 */
export function ConfirmedGuestsList() {
  const { guests, loading, error, totalPeople, totalGuests, refresh } = useConfirmedGuests();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-brand-sage-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-brand-sage-600">Carregando convidados...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">❌ {error}</p>
        <button 
          onClick={refresh}
          className="px-4 py-2 bg-brand-sage-500 text-white rounded hover:bg-brand-sage-600 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-brand-sage-600">Ainda não há convidados confirmados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
  <h3 className="text-2xl font-semibold text-brand-sage-700">
          Convidados Confirmados
        </h3>
        <button 
          onClick={refresh}
          className="text-brand-sage-600 hover:text-brand-sage-700 transition-colors"
          title="Atualizar lista"
        >
          🔄
        </button>
      </div>

      <div className="mb-4 p-4 bg-brand-sage-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-brand-sage-700">{totalGuests}</div>
            <div className="text-sm text-brand-sage-600">Confirmações</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-sage-700">{totalPeople}</div>
            <div className="text-sm text-brand-sage-600">Total de Pessoas</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {guests.map((guest) => (
          <div 
            key={guest.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div>
              <div className="font-medium text-brand-sage-700">{guest.name}</div>
              <div className="text-sm text-brand-sage-600">{guest.email}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-brand-sage-700">
                +{guest.companions}
              </div>
              <div className="text-xs text-brand-sage-500">acompanhante(s)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
