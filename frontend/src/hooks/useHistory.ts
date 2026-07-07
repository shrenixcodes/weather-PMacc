import { useState, useCallback } from 'react';
import { historyService } from '@/services/api';
import { WeatherHistory } from '@/types';

export function useHistory() {
  const [histories, setHistories] = useState<WeatherHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await historyService.getHistories();
      setHistories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch histories');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeHistory = useCallback(async (id: number) => {
    try {
      await historyService.deleteHistory(id);
      setHistories(prev => prev.filter(h => h.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete history');
    }
  }, []);

  return { histories, loading, error, fetchHistories, removeHistory };
}
