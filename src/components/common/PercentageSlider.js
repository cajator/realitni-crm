// src/components/common/PercentageSlider.js
import React from 'react';

function PercentageSlider({ value, onChange }) {
  const percentageMarks = [0, 10, 20, 40, 50, 60, 80, 90, 95, 100];

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">Procenta dokončení</label>
      <div className="relative pt-1">
        <div className="h-1 bg-navy-600 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute w-full h-1 opacity-0 cursor-pointer top-0"
        />
        <div className="flex justify-between mt-4">
          {percentageMarks.map(mark => (
            <div key={mark} className="flex flex-col items-center">
              <div className="w-1 h-1 bg-navy-600 rounded-full"></div>
              <span className="text-xs text-gray-400 mt-1">{mark}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PercentageSlider;