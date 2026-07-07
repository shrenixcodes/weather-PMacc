import { useEffect } from 'react';
import { Download, Trash2, FileText, FileJson } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function History() {
  const { histories, loading, error, fetchHistories, removeHistory } = useHistory();

  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Search History</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`${API_URL}/export/csv`} target="_blank" rel="noreferrer">
              <Download className="w-4 h-4 mr-2" /> CSV
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`${API_URL}/export/json`} target="_blank" rel="noreferrer">
              <FileJson className="w-4 h-4 mr-2" /> JSON
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`${API_URL}/export/pdf`} target="_blank" rel="noreferrer">
              <FileText className="w-4 h-4 mr-2" /> PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error ? (
          <div className="p-6 text-destructive">{error}</div>
        ) : histories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No search history found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Weather</th>
                  <th className="px-6 py-3 font-medium">Temp</th>
                  <th className="px-6 py-3 font-medium">AQI</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {histories.map((history) => (
                  <tr key={history.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{history.location.split(',')[0]}</td>
                    <td className="px-6 py-4">{new Date(history.created_at).toLocaleString()}</td>
                    <td className="px-6 py-4 capitalize">{history.weather}</td>
                    <td className="px-6 py-4">{history.temperature}°C</td>
                    <td className="px-6 py-4">{history.aqi || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeHistory(history.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
