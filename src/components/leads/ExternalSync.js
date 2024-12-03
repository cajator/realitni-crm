// src/components/leads/ExternalSync.js
import React from 'react';
import { Upload, RefreshCw, Check } from 'lucide-react';

function ExternalSync({ leadData, onExportToPoski, onUpdateFromPoski }) {
  return (
    <div className="bg-navy-700 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Poski Real</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onExportToPoski(leadData)}
            className="flex items-center space-x-2 px-3 py-1 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <Upload size={16} />
            <span>Exportovat do Poski</span>
          </button>
          <button
            onClick={() => onUpdateFromPoski(leadData.external?.poski_id)}
            className="flex items-center space-x-2 px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600"
            disabled={!leadData.external?.poski_id}
          >
            <RefreshCw size={16} />
            <span>Aktualizovat stav</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status exportu */}
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${
            leadData.external?.poski_id ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span>
            {leadData.external?.poski_id 
              ? 'Exportováno do Poski'
              : 'Čeká na export'
            }
          </span>
        </div>

        {/* Poski ID */}
        <div className="text-sm">
          <span className="text-gray-400">Poski ID:</span>
          <span className="ml-2">
            {leadData.external?.poski_id || 'Zatím neexportováno'}
          </span>
        </div>

        {/* Poslední aktualizace */}
        <div className="text-sm">
          <span className="text-gray-400">Poslední aktualizace:</span>
          <span className="ml-2">
            {leadData.external?.lastSync 
              ? new Date(leadData.external.lastSync).toLocaleString()
              : 'Nikdy'
            }
          </span>
        </div>

        {/* Data z Poski */}
        {leadData.external?.poskiData && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Data z Poski Real</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-400">Stav:</span>
                <span className="ml-2">{leadData.external.poskiData.stav || '-'}</span>
              </div>
              {leadData.external.poskiData.stav === 'REZERVOVANO' && (
                <div className="text-sm">
                  <span className="text-gray-400">Datum rezervace:</span>
                  <span className="ml-2">
                    {new Date(leadData.external.poskiData.datum_rezervace).toLocaleDateString()}
                  </span>
                </div>
              )}
              {leadData.external.poskiData.stav === 'PRODANO' && (
                <>
                  <div className="text-sm">
                    <span className="text-gray-400">Datum prodeje:</span>
                    <span className="ml-2">
                      {new Date(leadData.external.poskiData.datum_prodeje).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Prodejní cena:</span>
                    <span className="ml-2">
                      {leadData.external.poskiData.cena_prodeje} Kč
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExternalSync;