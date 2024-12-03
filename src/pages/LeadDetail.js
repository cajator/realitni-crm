// src/pages/LeadDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Timeline from '../layout/Timeline';

function LeadDetails() {
  const { id } = useParams();
  
  // Dummy data pro ukázku
  const lead = {
    title: "Prodej bytu 3+kk",
    id: id,
    status: "Zájem nepotvrzen",
    type: "Prodej",
    price: "5 300 000 Kč",
    location: "Praha",
    details: {
      propertyType: "Byt",
      disposition: "3+kk",
      area: "75m²",
      condition: "Velmi dobrý",
    }
  };

  const timelineEvents = [
    {
      id: 1,
      date: "30.11.2024",
      time: "12:03",
      title: "Změna stavu na \"Zájem nepotvrzen\"",
      type: "status"
    },
    {
      id: 2,
      date: "29.11.2024",
      time: "15:30",
      title: "Vytvoření leadu",
      type: "create"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Horní část s hlavními informacemi */}
      <div className="bg-navy-700 p-6 rounded-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{lead.title}</h1>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg text-sm">
                {lead.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{lead.price}</div>
            <div className="text-gray-400">Cena nemovitosti</div>
          </div>
        </div>

        {/* Základní informace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-600/50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-1">Typ nemovitosti</h3>
            <div className="font-semibold">{lead.details.propertyType}</div>
          </div>
          <div className="bg-navy-600/50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-1">Dispozice</h3>
            <div className="font-semibold">{lead.details.disposition}</div>
          </div>
          <div className="bg-navy-600/50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-1">Plocha</h3>
            <div className="font-semibold">{lead.details.area}</div>
          </div>
        </div>
      </div>

      {/* Časová osa a aktivita */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Timeline events={timelineEvents} />
        </div>

        {/* Pravý panel s poznámkami */}
        <div className="bg-navy-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Poznámky</h2>
          <div className="space-y-4">
            <textarea 
              className="w-full h-32 bg-navy-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-navy-400"
              placeholder="Přidat poznámku..."
            />
            <button className="w-full bg-navy-600 hover:bg-navy-500 text-white py-2 rounded-lg">
              Přidat poznámku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;