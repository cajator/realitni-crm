// src/components/leads/LeadFilters.js
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import DateSelect from '../common/DateSelect';
import PercentageSlider from '../common/PercentageSlider';

function LeadFilters({ filters, setFilters }) {
  const states = [
    { value: 'new', label: 'Nový' },
    { value: 'contacted', label: 'Kontaktován' },
    { value: 'meeting', label: 'Schůzka' },
    { value: 'offer', label: 'Nabídka' },
    { value: 'negotiation', label: 'Vyjednávání' },
    { value: 'contract', label: 'Smlouva' },
    { value: 'completed', label: 'Dokončeno' },
    { value: 'canceled', label: 'Zrušeno' }
  ];

  return (
    <div className="bg-navy-700/50 p-4 rounded-lg space-y-4">
      {/* Vyhledávání */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Hledat..."
            className="w-full bg-navy-700 border border-navy-600 rounded-lg pl-10 pr-4 py-2 text-white"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="btn btn-secondary">
          <SlidersHorizontal size={20} className="mr-2" />
          Filtry
        </button>
      </div>

      {/* Typ obchodu */}
      <div>
        <h3 className="text-sm text-gray-400 mb-2">Zobrazený typ obchodu</h3>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${filters.type === 'prodej' ? 'bg-navy-600 text-white' : 'bg-navy-800 text-gray-400'}`}
            onClick={() => setFilters({ ...filters, type: 'prodej' })}
          >
            Prodej
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filters.type === 'pronajem' ? 'bg-navy-600 text-white' : 'bg-navy-800 text-gray-400'}`}
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
            value={filters.source}
            onChange={(e) => setFilters({ ...filters, source: e.target.value })}
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
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          >
            {states.map(state => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Období</label>
          <DateSelect
            value={filters.dateRange}
            onChange={(value) => setFilters({ ...filters, dateRange: value })}
          />
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
      </div>

      {/* Percentage Slider */}
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
            source: 'all',
            state: 'all',
            dateRange: 'all',
            assigned: 'all',
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
  );
}

export default LeadFilters;