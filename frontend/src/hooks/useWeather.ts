import { useState, useCallback } from 'react';
import { weatherService, historyService } from '@/services/api';
import { WeatherData } from '@/types';

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await weatherService.getWeather(query);
      setData(result);
      
      // Save search to history automatically
      if (result && result.current) {
        try {
          await historyService.createHistory({
            location: result.location,
            latitude: result.latitude,
            longitude: result.longitude,
            temperature: result.current.main?.temp || 0,
            humidity: result.current.main?.humidity || 0,
            pressure: result.current.main?.pressure || 0,
            wind_speed: result.current.wind?.speed || 0,
            weather: result.current.weather?.[0]?.main || 'Unknown',
            aqi: result.aqi
          });
        } catch (historyErr) {
          console.error("Failed to save history automatically", historyErr);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };
}
