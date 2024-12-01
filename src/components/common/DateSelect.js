// src/components/common/DateSelect.js
import React from 'react';

const dateRanges = [
  { value: 'today', label: 'Dnes' },
  { value: 'yesterday', label: 'Včera' },
  { value: 'last7days', label: 'Posledních 7 dní' },
  { value: 'last14days', label: 'Posledních 14 dní' },
  { value: 'last30days', label: 'Posledních 30 dní' },
  { value: 'lastWeek', label: 'Minulý týden' },
  { value: 'thisMonth', label: 'Tento měsíc' },
  { value: 'lastMonth', label: 'Minulý měsíc' },
  { value: 'last3months', label: 'Předchozí 3 měsíce' },
  { value: 'last6months', label: 'Předchozích 6 měsíců' },
  { value: 'thisYear', label: 'Tento rok' },
  { value: 'lastYear', label: 'Minulý rok' },
  { value: 'infinite', label: 'Nekonečno' }
];

function DateSelect({ value, onChange }) {
  return (
    <select 
      className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {dateRanges.map(range => (
        <option key={range.value} value={range.value}>
          {range.label}
        </option>
      ))}
    </select>
  );
}

export default DateSelect;