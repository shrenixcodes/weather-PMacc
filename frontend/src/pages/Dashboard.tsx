import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Dashboard() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', search);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search city, zip code, coordinates..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium">New Delhi, India</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="h-[300px] rounded-xl bg-primary text-primary-foreground p-6 flex flex-col justify-between">
             <div>
               <h2 className="text-2xl font-bold">New Delhi, India</h2>
               <p className="opacity-80">Monday, 26 May 2025 • 11:30 AM</p>
             </div>
             <div className="flex items-center space-x-4">
                <div className="text-6xl font-bold">32°C</div>
                <div className="text-lg">Partly Cloudy<br/>Feels like 36°C</div>
             </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="bg-card border rounded-xl p-4 text-center">
                   <div className="font-medium mb-2">Tue</div>
                   <div className="text-xl font-bold">33°C</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
           <div className="h-[200px] bg-card border rounded-xl flex items-center justify-center text-muted-foreground">
              Map Placeholder
           </div>
           <div className="h-[150px] bg-card border rounded-xl p-6">
              <h3 className="font-semibold mb-2">Air Quality Index</h3>
              <div className="text-3xl font-bold text-green-500">78</div>
           </div>
        </div>
      </div>
    </div>
  );
}
