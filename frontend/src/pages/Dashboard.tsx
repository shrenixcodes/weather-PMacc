import { useState, useEffect } from 'react';
import { Search, Droplets, Wind, Eye, Sun, MapPin, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWeather } from '@/hooks/useWeather';
import { LocationMap } from '@/components/map/Map';
import { TemperatureTrendChart } from '@/components/weather/TemperatureTrendChart';

export function Dashboard() {
  const [search, setSearch] = useState('');
  const { data, loading, error, fetchWeather } = useWeather();

  // Load default city on mount
  useEffect(() => {
    fetchWeather('New Delhi');
  }, [fetchWeather]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      fetchWeather(search);
    }
  };

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full max-w-md rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[150px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const getAQIDescription = (aqi: number | null) => {
    if (!aqi) return 'Data unavailable';
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getAQIColor = (aqi: number | null) => {
    if (!aqi) return 'text-muted-foreground';
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    if (aqi <= 200) return 'text-red-500';
    return 'text-purple-500';
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search city, zip code, coordinates..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {data && (
          <div className="flex items-center space-x-2 text-sm font-medium">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{data.location}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-4 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Left Column */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Current Weather Card */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 md:p-8 flex flex-col justify-between shadow-md">
               <div className="relative z-10 flex flex-col h-full justify-between min-h-[250px]">
                 <div>
                   <h2 className="text-2xl md:text-3xl font-bold">{data.location.split(',')[0]}</h2>
                   <p className="opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                 </div>
                 
                 <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-4">
                      {/* Weather Icon (using OWM icon) */}
                      <img 
                        src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`} 
                        alt="weather icon"
                        className="w-24 h-24 object-contain drop-shadow-md"
                      />
                      <div>
                        <div className="text-6xl md:text-7xl font-bold">{Math.round(data.current.main.temp)}°C</div>
                        <div className="text-xl font-medium mt-1 capitalize">{data.current.weather[0].description}</div>
                        <div className="text-sm opacity-90">Feels like {Math.round(data.current.main.feels_like)}°C</div>
                      </div>
                    </div>
                 </div>

                 {/* Metrics row */}
                 <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
                    <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                      <Droplets className="w-5 h-5 opacity-70 mb-1 sm:mb-0" />
                      <div>
                        <div className="text-xs opacity-70">Humidity</div>
                        <div className="font-semibold">{data.current.main.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                      <Wind className="w-5 h-5 opacity-70 mb-1 sm:mb-0" />
                      <div>
                        <div className="text-xs opacity-70">Wind</div>
                        <div className="font-semibold">{data.current.wind.speed} m/s</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                      <Sun className="w-5 h-5 opacity-70 mb-1 sm:mb-0" />
                      <div>
                        <div className="text-xs opacity-70">Pressure</div>
                        <div className="font-semibold">{data.current.main.pressure} hPa</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:flex-row sm:space-x-2">
                      <Eye className="w-5 h-5 opacity-70 mb-1 sm:mb-0" />
                      <div>
                        <div className="text-xs opacity-70">Visibility</div>
                        <div className="font-semibold">{(data.current.visibility / 1000).toFixed(1)} km</div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
            
            {/* 5-Day Forecast & Trend */}
            <Card>
              <CardHeader>
                <CardTitle>5-Day Forecast & Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                  {data.forecast && data.forecast.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5).map((item: any, i: number) => (
                    <div key={i} className="flex flex-col items-center p-3 rounded-lg bg-muted/50 text-center">
                      <div className="text-sm font-medium mb-1">
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" className="w-10 h-10" />
                      <div className="font-bold">{Math.round(item.main.temp)}°C</div>
                      <div className="text-xs text-muted-foreground mt-1">{Math.round(item.pop * 100)}% rain</div>
                    </div>
                  ))}
                </div>
                <TemperatureTrendChart forecastData={data.forecast} />
              </CardContent>
            </Card>

          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
             <Card>
               <CardHeader className="pb-3">
                 <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location Map</CardTitle>
               </CardHeader>
               <CardContent>
                  <LocationMap 
                    latitude={data.latitude} 
                    longitude={data.longitude} 
                    locationName={data.location} 
                  />
               </CardContent>
             </Card>

             <Card>
               <CardHeader className="pb-3">
                 <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Air Quality Index</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center space-x-6">
                   <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-muted">
                     <span className={`text-3xl font-bold ${getAQIColor(data.aqi)}`}>{data.aqi || '--'}</span>
                   </div>
                   <div>
                     <h4 className="font-semibold">{getAQIDescription(data.aqi)}</h4>
                     <p className="text-sm text-muted-foreground mt-1">Based on US AQI standard.</p>
                   </div>
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}
