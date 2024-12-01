// src/components/common/DateRangePicker.js
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

function DateRangePicker({ onRangeChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState('custom');

  const predefinedRanges = [
    { label: 'Dnes', value: 'today' },
    { label: 'Včera', value: 'yesterday' },
    { label: 'Posledních 7 dní', value: 'last7days' },
    { label: 'Posledních 14 dní', value: 'last14days' },
    { label: 'Posledních 30 dní', value: 'last30days' },
    { label: 'Minulý týden', value: 'lastWeek' },
    { label: 'Tento měsíc', value: 'thisMonth' },
    { label: 'Minulý měsíc', value: 'lastMonth' },
    { label: 'Předchozí 3 měsíce', value: 'last3months' },
    { label: 'Předchozích 6 měsíců', value: 'last6months' },
    { label: 'Tento rok', value: 'thisYear' },
    { label: 'Minulý rok', value: 'lastYear' },
    { label: 'Nekonečno', value: 'infinite' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full px-4 py-2 bg-navy-700 border border-navy-600 rounded-lg text-white flex items-center justify-between"
      >
        <span>Fixní datum</span>
        <Calendar size={20} className="text-gray-400" />
      </button>

      {showCalendar && (
        <div className="absolute z-50 mt-2 w-72 bg-navy-800 rounded-lg shadow-lg border border-navy-600">
          <div className="p-4">
            <div className="space-y-2">
              {predefinedRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => {
                    setSelectedRange(range.value);
                    onRangeChange(range.value);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedRange === range.value 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-navy-700 text-gray-400'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;