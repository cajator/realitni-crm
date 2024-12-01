// src/components/leads/PropertyParameters.js
import React, { useState } from 'react';
import { Edit2, Save, X, ChevronDown } from 'lucide-react';

// Definice možností pro jednotlivé parametry
const PROPERTY_OPTIONS = {
  typ_nemovitosti: [
    'Byt',
    'Dům',
    'Pozemek',
    'Komerční objekt',
    'Garáž',
    'Chata/Chalupa',
    'Nebytový prostor'
  ],
  dispozice: [
    'Garsoniéra',
    '1+kk',
    '1+1',
    '2+kk',
    '2+1',
    '3+kk',
    '3+1',
    '4+kk',
    '4+1',
    '5+kk',
    '5+1',
    '6 a více'
  ],
  stav_objektu: [
    'Novostavba',
    'Ve výstavbě',
    'Před rekonstrukcí',
    'Po rekonstrukci',
    'Velmi dobrý',
    'Dobrý',
    'K rekonstrukci',
    'Ve výstavbě',
    'Demolice'
  ],
  vlastnictvi: [
    'Osobní',
    'Družstevní',
    'Státní/obecní'
  ]
};

const PropertyParameters = ({ parameters, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedParams, setEditedParams] = useState(parameters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = () => {
    onUpdate(editedParams);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedParams(parameters);
    setIsEditing(false);
  };

  const renderField = (field) => {
    return (
      <div key={field.key} className="space-y-1">
        <label className="text-sm text-gray-400">{field.label}</label>
        {isEditing ? (
          field.type === 'select' ? (
            <select
              value={editedParams[field.key] || ''}
              onChange={(e) => setEditedParams({
                ...editedParams,
                [field.key]: e.target.value
              })}
              className="w-full bg-navy-600 rounded px-2 py-1 text-sm"
            >
              <option value="">Vyberte...</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={editedParams[field.key] || ''}
              onChange={(e) => setEditedParams({
                ...editedParams,
                [field.key]: e.target.value
              })}
              className="w-full bg-navy-600 rounded px-2 py-1 text-sm"
            />
          )
        ) : (
          <div className="text-sm">{parameters[field.key] || '-'}</div>
        )}
      </div>
    );
  };

  const BASIC_FIELDS = [
    {
      key: 'typ_nemovitosti',
      label: 'Typ nemovitosti',
      type: 'select',
      options: PROPERTY_OPTIONS.typ_nemovitosti
    },
    {
      key: 'dispozice',
      label: 'Dispozice',
      type: 'select',
      options: PROPERTY_OPTIONS.dispozice
    },
    {
      key: 'plocha',
      label: 'Plocha (m²)',
      type: 'number'
    },
    {
      key: 'cena',
      label: 'Cena',
      type: 'number'
    },
    {
      key: 'stav_objektu',
      label: 'Stav objektu',
      type: 'select',
      options: PROPERTY_OPTIONS.stav_objektu
    }
  ];

  const ADVANCED_FIELDS = [
    {
      key: 'vlastnictvi',
      label: 'Vlastnictví',
      type: 'select',
      options: PROPERTY_OPTIONS.vlastnictvi
    },
    {
      key: 'patro',
      label: 'Patro',
      type: 'number'
    },
    {
      key: 'vytah',
      label: 'Výtah',
      type: 'select',
      options: ['Ano', 'Ne']
    },
    {
      key: 'balkon',
      label: 'Balkón',
      type: 'select',
      options: ['Ano', 'Ne']
    },
    {
      key: 'sklep',
      label: 'Sklep',
      type: 'select',
      options: ['Ano', 'Ne']
    }
  ];

  return (
    <div className="bg-navy-700 p-4 rounded-lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Parametry nemovitosti</h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-300"
            >
              <Edit2 size={16} />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="text-green-400 hover:text-green-300"
              >
                <Save size={16} />
              </button>
              <button 
                onClick={handleCancel}
                className="text-red-400 hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Základní parametry */}
        <div className="grid grid-cols-2 gap-4">
          {BASIC_FIELDS.map(renderField)}
        </div>

        {/* Rozšířené parametry */}
        <div className="border-t border-navy-600 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            {showAdvanced ? 'Skrýt' : 'Zobrazit'} rozšířené parametry
            <ChevronDown 
              size={16} 
              className={`ml-1 transform transition-transform ${
                showAdvanced ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {showAdvanced && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {ADVANCED_FIELDS.map(renderField)}
            </div>
          )}
        </div>

        {/* Tlačítka pro uložení */}
        {isEditing && (
          <div className="border-t border-navy-600 pt-4 flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-500"
            >
              Zrušit
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Uložit změny
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyParameters;