import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import DateSelect from '../components/common/DateSelect';
import PercentageSlider from '../components/common/PercentageSlider';

function Leads() {
  const [filters, setFilters] = useState({
    search: '',
    type: 'prodej',
    sources: 'all',
    states: 'all',
    assigned: 'all',
    dateRange: 'all',
    percentage: 0
  });

  const leads = [
    { 
      id: 1, 
      title: "Prodej bytu 3+kk", 
      location: "Praha", 
      price: "5 300 000 Kč",
      status: "Zájem nepotvrzen" 
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Příležitosti</h1>
      
      {/* Vyhledávací lišta a filtry */}
      <div className="bg-navy-700/50 p-4 rounded-lg space-y-4">
        {/* Vyhledávání */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Hledat příležitosti..."
              className="w-full bg-navy-700 border border-navy-600 rounded-lg pl-10 pr-4 py-2 text-white"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button className="px-4 py-2 bg-navy-700 text-white rounded-lg flex items-center space-x-2">
            <SlidersHorizontal size={20} />
            <span>Filtry</span>
          </button>
        </div>

        {/* Typ příležitosti */}
        <div>
          <label className="text-sm text-gray-400 mb-2">Zobrazený typ obchodu</label>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg ${
                filters.type === 'prodej' ? 'bg-navy-600 text-white' : 'bg-navy-800 text-gray-400'
              }`}
              onClick={() => setFilters({ ...filters, type: 'prodej' })}
            >
              Prodej
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                filters.type === 'pronajem' ? 'bg-navy-600 text-white' : 'bg-navy-800 text-gray-400'
              }`}
              onClick={() => setFilters({ ...filters, type: 'pronajem' })}
            >
              Pronájem
            </button>
          </div>
        </div>

        {/* Hlavní filtry */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Zdroje</label>
            <select
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-white"
              value={filters.sources}
              onChange={(e) => setFilters({ ...filters, sources: e.target.value })}
            >
              <option value="all">Všechny zdroje</option>
              <option value="web">Web</option>
              <option value="doporuceni">Doporučení</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Stavy</label>
            <select
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-white"
              value={filters.states}
              onChange={(e) => setFilters({ ...filters, states: e.target.value })}
            >
              <option value="all">Všechny stavy</option>
              <option value="new">Nový</option>
              <option value="contacted">Kontaktován</option>
              <option value="meeting">Schůzka</option>
              <option value="offer">Nabídka</option>
              <option value="negotiation">Vyjednávání</option>
              <option value="contract">Smlouva</option>
              <option value="completed">Dokončeno</option>
              <option value="canceled">Zrušeno</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Přiřazeno</label>
            <select
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-white"
              value={filters.assigned}
              onChange={(e) => setFilters({ ...filters, assigned: e.target.value })}
            >
              <option value="all">Všichni</option>
              <option value="me">Mně</option>
              <option value="team">Týmu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Období</label>
            <DateSelect
              value={filters.dateRange}
              onChange={(value) => setFilters({ ...filters, dateRange: value })}
            />
          </div>
        </div>

        {/* Procenta */}
        <PercentageSlider
          value={filters.percentage}
          onChange={(value) => setFilters({ ...filters, percentage: value })}
        />

        {/* Akční tlačítka */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setFilters({
              search: '',
              type: 'prodej',
              sources: 'all',
              states: 'all',
              assigned: 'all',
              dateRange: 'all',
              percentage: 0
            })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Resetovat filtry
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Exportovat (.xlsx)
          </button>
        </div>
      </div>

      {/* Seznam příležitostí */}
      <div className="space-y-4">
        {leads.map(lead => (
          <Link 
            key={lead.id}
            to={`/leads/${lead.id}`}
            className="block bg-navy-700 p-4 rounded-lg hover:bg-navy-600 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{lead.title}</h3>
                <div className="text-gray-400">{lead.location}</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-right">{lead.price}</div>
                <div className="text-sm text-gray-400 text-right">{lead.status}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Leads;