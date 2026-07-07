import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  forecastData: any;
}

export function TemperatureTrendChart({ forecastData }: ChartProps) {
  if (!forecastData || !forecastData.list) {
    return <div className="h-[250px] flex items-center justify-center text-muted-foreground">No data available</div>;
  }

  // Extract one data point per day
  const dailyData: any[] = [];
  const processedDays = new Set();

  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!processedDays.has(date) && dailyData.length < 5) {
      processedDays.add(date);
      dailyData.push({
        name: date,
        temp: Math.round(item.main.temp)
      });
    }
  });

  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dailyData}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: 'black', fontWeight: 'bold' }}
          />
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--background))' }}
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
