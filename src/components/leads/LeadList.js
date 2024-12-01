import React from 'react';
import { useNavigate } from 'react-router-dom';

function LeadList() {
  const navigate = useNavigate();

  const leads = [
    {
      id: 1,
      title: "Hypotéka - Byt 3+kk",
      client: "Lukáš Běhal",
      location: "Praha",
      status: "Zájem nepotvrzen",
      price: "5 300 000 Kč",
      percentage: "77%",
      date: "30.11.2024"
    },
    // Můžete přidat další dummy data
  ];

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <div
          key={lead.id}
          className="bg-navy-700 p-4 rounded-lg hover:bg-navy-600 transition-colors cursor-pointer"
          onClick={() => navigate(`/leads/${lead.id}`)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white font-semibold">
                  {lead.client.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold">{lead.title}</h3>
                  <p className="text-sm text-gray-400">{lead.client}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{lead.price}</div>
              <div className="text-sm text-gray-400">LTV: {lead.percentage}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-400">{lead.location}</span>
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-lg">
              {lead.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeadList;