// src/components/leads/ParametersList.js
import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

function ParametersList({ 
  title, 
  parameters, 
  isEditing, 
  onStartEdit, 
  onSave, 
  onCancel 
}) {
  const [editedParams, setEditedParams] = useState({});

  const handleStartEdit = () => {
    setEditedParams({ ...parameters });
    onStartEdit();
  };

  const handleChange = (key, value) => {
    let processedValue = value;
    
    // Zpracování hodnoty podle typu původního parametru
    if (typeof parameters[key] === 'boolean') {
      processedValue = value === 'true';
    } else if (typeof parameters[key] === 'number') {
      processedValue = value === '' ? '' : Number(value);
    }

    setEditedParams(prev => ({
      ...prev,
      [key]: processedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedParams);
  };

  const formatKey = (key) => {
    return key.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderValue = (key, value) => {  // Přidán parametr key
    if (typeof value === 'boolean') {
      return value ? 'Ano' : 'Ne';
    }
    if (typeof value === 'number' && key === 'plocha') {
      return `${value} m²`;
    }
    return value;
  };

  const renderEditField = (key, value) => {
    if (typeof parameters[key] === 'boolean') {
      return (
        <select
          value={value.toString()}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full bg-navy-600 rounded px-2 py-1.5 text-sm"
        >
          <option value="true">Ano</option>
          <option value="false">Ne</option>
        </select>
      );
    }

    if (typeof parameters[key] === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full bg-navy-600 rounded px-2 py-1.5 text-sm"
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full bg-navy-600 rounded px-2 py-1.5 text-sm"
      />
    );
  };

  return (
    <div className="bg-navy-700 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {!isEditing ? (
          <button
            onClick={handleStartEdit}
            className="px-3 py-1.5 text-sm bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <Edit2 size={16} className="mr-1.5" />
            Upravit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-sm bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center"
            >
              <X size={16} className="mr-1.5" />
              Zrušit
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1.5 text-sm bg-green-600 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Save size={16} className="mr-1.5" />
              Uložit
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {Object.entries(editedParams).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm text-gray-400">
                  {formatKey(key)}:
                </label>
                {renderEditField(key, value)}
              </div>
            ))}
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {Object.entries(parameters).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{formatKey(key)}:</span>
              <span className="text-sm">{renderValue(key, value)}</span>  {/* Přidán parametr key */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParametersList;