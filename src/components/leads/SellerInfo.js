// src/components/leads/SellerInfo.js
import React, { useState } from 'react';
import { Edit2, Save, X, Phone, Mail, Clock, User, MapPin } from 'lucide-react';

function SellerInfo({ seller, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSeller, setEditedSeller] = useState(seller);

  const fields = [
    { key: 'jmeno', label: 'Jméno a příjmení', type: 'text', icon: User },
    { key: 'telefon', label: 'Telefon', type: 'tel', icon: Phone },
    { key: 'email', label: 'Email', type: 'email', icon: Mail },
    { key: 'adresa', label: 'Adresa', type: 'text', icon: MapPin },
    { key: 'cas_komunikace', label: 'Preferovaný čas', type: 'select', icon: Clock,
      options: ['Ráno', 'Dopoledne', 'Odpoledne', 'Večer', 'Kdykoliv'] },
    { key: 'vlastnik', label: 'Vztah k nemovitosti', type: 'select', 
      options: ['Majitel', 'Spolumajitel', 'Prostředník', 'Správce'] },
    { key: 'poznamka', label: 'Poznámka', type: 'textarea' }
  ];

  return (
    <div className="bg-navy-700 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Informace o prodávajícím</h2>
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
              onClick={() => {
                onUpdate(editedSeller);
                setIsEditing(false);
              }}
              className="text-green-400 hover:text-green-300"
            >
              <Save size={16} />
            </button>
            <button 
              onClick={() => {
                setEditedSeller(seller);
                setIsEditing(false);
              }}
              className="text-red-400 hover:text-red-300"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key} className="space-y-1">
            <div className="flex items-center text-gray-400">
              {field.icon && <field.icon size={16} className="mr-2" />}
              <label className="text-sm">{field.label}</label>
            </div>
            {isEditing ? (
              field.type === 'textarea' ? (
                <textarea
                  value={editedSeller[field.key] || ''}
                  onChange={(e) => setEditedSeller({
                    ...editedSeller,
                    [field.key]: e.target.value
                  })}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                  rows={3}
                />
              ) : field.type === 'select' ? (
                <select
                  value={editedSeller[field.key] || ''}
                  onChange={(e) => setEditedSeller({
                    ...editedSeller,
                    [field.key]: e.target.value
                  })}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                >
                  <option value="">Vyberte...</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={editedSeller[field.key] || ''}
                  onChange={(e) => setEditedSeller({
                    ...editedSeller,
                    [field.key]: e.target.value
                  })}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                />
              )
            ) : (
              <div className="text-sm">
                {seller[field.key] || '-'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerInfo;