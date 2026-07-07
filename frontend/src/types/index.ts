export interface WeatherData {
  location: string;
  latitude: number;
  longitude: number;
  current: any;
  forecast: any;
  aqi: number | null;
}

export interface WeatherHistory {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  start_date: string | null;
  end_date: string | null;
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  weather: string;
  aqi: number | null;
  created_at: string;
}
