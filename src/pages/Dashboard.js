import React from 'react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-navy-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Aktivní leady</h3>
          <div className="text-3xl font-bold">42</div>
        </div>
        <div className="bg-navy-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Úspěšnost</h3>
          <div className="text-3xl font-bold">68%</div>
        </div>
        <div className="bg-navy-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Průměrná hodnota</h3>
          <div className="text-3xl font-bold">4.2M Kč</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Stav leadů</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Graf bude přidán později
          </div>
        </div>
        <div className="bg-navy-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Měsíční přehled</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Graf bude přidán později
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;