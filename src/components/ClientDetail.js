import React from 'react';
import { Phone, Mail, MapPin, Plus, PenSquare } from 'lucide-react';

const ClientDetail = ({ client }) => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-xl font-bold">
            {client?.initials || 'LB'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{client?.name || 'Lukáš Běhal'}</h2>
            <p className="text-gray-400">{client?.location || 'Praha'}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-green-600 rounded flex items-center space-x-2">
          <Plus size={20} />
          <span>Nová příležitost</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone size={20} className="text-gray-400" />
            <span>{client?.phone || '773618304'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={20} className="text-gray-400" />
            <span>{client?.email || 'lukas.behal@email.cz'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-gray-400" />
            <span>{client?.address || 'Praha (PSČ 19600)'}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-800 rounded flex items-center space-x-2">
              <Phone size={20} />
              <span>Telefonovat</span>
            </button>
            <button className="px-4 py-2 bg-gray-800 rounded">
              <PenSquare size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Google Disk: Lukáš Běhal</h3>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-400">
            Google Disk je připraven, ale žádné soubory nejsou k dispozici, nebo k nim nemáte práva.
          </p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">E-mailový klient</h3>
        <div className="bg-gray-800 p-4 rounded space-y-4">
          <div className="flex justify-between">
            <span>Odesílatel</span>
            <span>Příjemce</span>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-700 rounded">Externí aplikace</button>
            <button className="px-4 py-2 bg-gray-700 rounded">Šablony</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;