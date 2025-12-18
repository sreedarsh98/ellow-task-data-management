import { useState, useEffect } from 'react';
import { DataTable } from './components/DataTable';
import { mockData } from './data/mockData';
import { Database } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Data Management System
            </h1>
          </div>
        </div>

        <DataTable data={mockData} isLoading={isLoading} />

        <div className="mt-6 text-center text-sm text-gray-500">
          Total Records: {mockData.length.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default App;
