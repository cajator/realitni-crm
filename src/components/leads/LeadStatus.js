import React from 'react';
import { MapPin } from 'lucide-react';

const statuses = [
  { id: 'zajem_nepotvrzen', label: 'Zájem nepotvrzen', color: 'bg-yellow-600', percentage: 1 },
  { id: 'zajem_potvrzen', label: 'Zájem potvrzen', color: 'bg-yellow-700', percentage: 5 },
  { id: 'domluva_prohlidky', label: 'Domluvit prohlídku', color: 'bg-blue-600', percentage: 15 },
  { id: 'prohlidka_hotova', label: 'Prohlídka hotova', color: 'bg-blue-700', percentage: 25 },
  { id: 'priprava_smlouvy', label: 'Příprava smlouvy', color: 'bg-purple-600', percentage: 35 },
  { id: 'smlouva_podepsana', label: 'Smlouva podepsána', color: 'bg-purple-700', percentage: 45 },
  { id: 'inzerce_pripravena', label: 'Inzerce připravena', color: 'bg-orange-600', percentage: 60 },
  { id: 'inzerce_aktivni', label: 'Aktivní nabídka', color: 'bg-orange-700', percentage: 70 },
  { id: 'rezervace', label: 'Rezervováno', color: 'bg-green-600', percentage: 90 },
  { id: 'prodano', label: 'Prodáno', color: 'bg-green-700', percentage: 100 },
  { id: 'zruseno', label: 'Zrušeno', color: 'bg-red-600', percentage: 0 }
];

function LeadStatus({ currentStatus, onStatusChange }) {
  const currentStatusData = statuses.find(s => s.id === currentStatus);

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="relative">
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-400">Průběh zakázky</span>
          <span className="text-gray-400">{currentStatusData?.percentage}%</span>
        </div>
        <div className="h-2 bg-navy-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${currentStatusData?.percentage || 0}%` }}
          />
        </div>
      </div>

      {/* Stavy */}
      <div className="grid grid-cols-6 gap-2">
        {statuses.map(status => (
          <button
            key={status.id}
            onClick={() => onStatusChange(status.id, status.label)}
            className={`p-2 rounded text-xs transition-colors ${
              currentStatus === status.id
                ? `${status.color} text-white`
                : 'bg-navy-600 text-gray-400 hover:bg-navy-500'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LeadStatus;