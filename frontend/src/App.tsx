import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { History } from '@/pages/History';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background font-sans antialiased text-foreground">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
