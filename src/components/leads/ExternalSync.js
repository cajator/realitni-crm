// src/components/leads/ExternalSync.js
import React from 'react';
import { RefreshCw, Check, AlertTriangle } from 'lucide-react';

function ExternalSync({ externalData, onSync }) {
  return (
    <div className="bg-navy-700 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Externí systém</h2>
        <button
          onClick={onSync}
          className="flex items-center space-x-2 px-3 py-1 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          <RefreshCw size={16} />
          <span>Synchronizovat</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Status synchronizace */}
        <div className="flex items-center space-x-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${
            externalData.synced ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span>
            {externalData.synced 
              ? 'Synchronizováno'
              : 'Čeká na synchronizaci'
            }
          </span>
        </div>

        {/* Externí ID */}
        <div className="text-sm">
          <span className="text-gray-400">Externí ID:</span>
          <span className="ml-2">
            {externalData.externalId || 'Zatím nesynchronizováno'}
          </span>
        </div>

        {/* Poslední synchronizace */}
        <div className="text-sm">
          <span className="text-gray-400">Poslední synchronizace:</span>
          <span className="ml-2">
            {externalData.lastSync 
              ? new Date(externalData.lastSync).toLocaleString()
              : 'Nikdy'
            }
          </span>
        </div>

        {/* Externí data */}
        {externalData.data && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Data z externího systému</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-400">Počet prohlídek:</span>
                <span className="ml-2">{externalData.data.viewings || 0}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Aktivní zájemci:</span>
                <span className="ml-2">{externalData.data.activeLeads || 0}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Poslední aktivita:</span>
                <span className="ml-2">
                  {externalData.data.lastActivity
                    ? new Date(externalData.data.lastActivity).toLocaleString()
                    : '-'
                  }
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExternalSync;