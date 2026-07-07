import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Clock, 
  Settings,
  CloudSun
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'History', href: '/history', icon: Clock },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border min-h-screen">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <CloudSun className="w-8 h-8 text-primary mr-3" />
        <span className="text-xl font-bold">WeatherX</span>
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
