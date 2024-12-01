import React, { useState } from 'react';
import { Menu } from '@headlessui/react';

const FilterOpportunities = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [percentageRange, setPercentageRange] = useState({ min: 0, max: 100 });
  
  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-800 rounded">Úvěry</button>
          <button className="px-4 py-2 bg-gray-800 rounded">Pojištění</button>
          <button className="px-4 py-2 bg-gray-800 rounded">Investice</button>
          <button className="px-4 py-2 bg-gray-800 rounded">Vše</button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>Fixní datum</span>
            <input
              type="date"
              className="bg-gray-800 rounded px-2 py-1"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span>-</span>
            <input
              type="date"
              className="bg-gray-800 rounded px-2 py-1"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Menu as="div" className="relative">
          <Menu.Button className="w-full text-left px-4 py-2 bg-gray-800 rounded">
            Zdroje
          </Menu.Button>
          <Menu.Items className="absolute mt-1 w-full bg-gray-800 rounded shadow-lg">
            <div className="p-2">
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-gray-700' : ''} w-full text-left px-2 py-1 rounded`}>
                    Všechny zdroje
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button className="w-full text-left px-4 py-2 bg-gray-800 rounded">
            Stavy
          </Menu.Button>
          <Menu.Items className="absolute mt-1 w-full bg-gray-800 rounded shadow-lg">
            <div className="p-2">
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-gray-700' : ''} w-full text-left px-2 py-1 rounded`}>
                    Všechny stavy
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button className="w-full text-left px-4 py-2 bg-gray-800 rounded">
            Přiděleno
          </Menu.Button>
          <Menu.Items className="absolute mt-1 w-full bg-gray-800 rounded shadow-lg">
            <div className="p-2">
              <Menu.Item>
                {({ active }) => (
                  <button className={`${active ? 'bg-gray-700' : ''} w-full text-left px-2 py-1 rounded`}>
                    Všichni uživatelé
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Procenta</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            className="w-full"
            min="0"
            max="100"
            value={percentageRange.max}
            onChange={(e) => setPercentageRange({ ...percentageRange, max: parseInt(e.target.value) })}
          />
          <span>{percentageRange.max}%</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 bg-green-600 rounded">
          Exportovat (.xlsx)
        </button>
        <button className="px-4 py-2 bg-red-600 rounded">
          Resetovat filtrování
        </button>
      </div>
    </div>
  );
};

export default FilterOpportunities;