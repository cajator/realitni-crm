import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Phone, Mail, Clock, User, Upload, RefreshCw, Edit2, Save, X } from 'lucide-react';
import LeadStatus from './LeadStatus';
import PropertyParameters from './PropertyParameters';
import PropertyMedia from './PropertyMedia';
import ExternalSync from './ExternalSync';
import SellerInfo from './SellerInfo';

function LeadDetail() {
  const { id } = useParams();
  const [newNote, setNewNote] = useState('');
  
  const [lead, setLead] = useState({
    id,
    nazev: "Prodej bytu 3+kk",
    lokalita: "Praha 5",
    cena: "5 300 000 Kč",
    stav: "zajem_nepotvrzen",
    
    parametry: {
      typ_nemovitosti: "Byt",
      dispozice: "3+kk",
      plocha: "75",
      stav_objektu: "Velmi dobrý",
      vlastnictvi: "Osobní",
      patro: "3",
      celkem_podlazi: "6",
      vytah: "Ano",
      balkon: "Ne",
      terasa: "Ano",
      sklep: "Ano"
    },

    prodavajici: {
      jmeno: "Jan Novák",
      telefon: "+420 777 888 999",
      email: "jan.novak@email.cz",
      adresa: "Dlouhá 123, Praha 5",
      cas_komunikace: "Odpoledne",
      vlastnik: "Majitel",
      poznamka: "Preferuje komunikaci po telefonu"
    },

    obchodni_info: {
      provize: "3%",
      provize_castka: "159 000 Kč",
      typ_smlouvy: null,
      platnost_do: null,
      ocekavana_doba_prodeje: "3 měsíce"
    },

    media: [],
    external: {
      synced: false,
      externalId: null,
      lastSync: null,
      data: null
    },
    historie: [],
    poznamky: []
  });

  const handleMediaUpload = async (files) => {
    const newMedia = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: URL.createObjectURL(file)
    }));

    setLead(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia],
      historie: [
        {
          id: Date.now(),
          cas: new Date().toISOString(),
          typ: 'media',
          text: `Přidáno ${newMedia.length} souborů`
        },
        ...prev.historie
      ]
    }));
  };

  const handleMediaDelete = (mediaId) => {
    setLead(prev => ({
      ...prev,
      media: prev.media.filter(m => m.id !== mediaId),
      historie: [
        {
          id: Date.now(),
          cas: new Date().toISOString(),
          typ: 'media',
          text: 'Soubor byl smazán'
        },
        ...prev.historie
      ]
    }));
  };

  const handleParametersUpdate = (newParams) => {
    setLead(prev => ({
      ...prev,
      parametry: newParams,
      historie: [
        {
          id: Date.now(),
          cas: new Date().toISOString(),
          typ: 'parametry',
          text: 'Parametry nemovitosti byly aktualizovány'
        },
        ...prev.historie
      ]
    }));
  };

  const handleSellerUpdate = (newSeller) => {
    setLead(prev => ({
      ...prev,
      prodavajici: newSeller,
      historie: [
        {
          id: Date.now(),
          cas: new Date().toISOString(),
          typ: 'prodavajici',
          text: 'Informace o prodávajícím byly aktualizovány'
        },
        ...prev.historie
      ]
    }));
  };

  const handleSync = async () => {
    setLead(prev => ({
      ...prev,
      external: {
        ...prev.external,
        synced: true,
        lastSync: new Date().toISOString(),
        data: {
          viewings: 5,
          activeLeads: 3,
          lastActivity: new Date().toISOString()
        }
      },
      historie: [
        {
          id: Date.now(),
          cas: new Date().toISOString(),
          typ: 'sync',
          text: 'Synchronizace s externím systémem'
        },
        ...prev.historie
      ]
    }));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const event = {
      id: Date.now(),
      cas: new Date().toISOString(),
      typ: 'poznamka',
      text: newNote
    };

    setLead(prev => ({
      ...prev,
      poznamky: [event, ...prev.poznamky],
      historie: [event, ...prev.historie]
    }));
    setNewNote('');
  };

  return (
    <div className="space-y-4">
      {/* Hlavička */}
      <div className="bg-navy-700 p-4 rounded-lg flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold">{lead.nazev}</h1>
          <div className="flex items-center text-gray-400 mt-1">
            <MapPin size={16} className="mr-1" />
            {lead.lokalita}
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.lokalita)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-400 hover:text-blue-300"
            >
              Zobrazit na mapě
            </a>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">{lead.cena}</div>
        </div>
      </div>

      {/* Hlavní obsah */}
      <div className="grid grid-cols-3 gap-4">
        {/* Levý sloupec */}
        <div className="space-y-4">
          <PropertyParameters 
            parameters={lead.parametry}
            onUpdate={handleParametersUpdate}
          />
          <SellerInfo 
            seller={lead.prodavajici}
            onUpdate={handleSellerUpdate}
          />
        </div>

        {/* Střední a pravý sloupec */}
        <div className="col-span-2 space-y-4">
          {/* Status */}
          <div className="bg-navy-700 p-4 rounded-lg">
            <LeadStatus
              currentStatus={lead.stav}
              onStatusChange={(newStatus, label) => {
                setLead(prev => ({
                  ...prev,
                  stav: newStatus,
                  historie: [
                    {
                      id: Date.now(),
                      cas: new Date().toISOString(),
                      typ: 'zmena_stavu',
                      text: `Změna stavu na "${label}"`
                    },
                    ...prev.historie
                  ]
                }));
              }}
            />
          </div>

          {/* Média */}
          <PropertyMedia 
            media={lead.media}
            onUpload={handleMediaUpload}
            onDelete={handleMediaDelete}
          />

          {/* Externí synchronizace */}
          <ExternalSync 
            externalData={lead.external}
            onSync={handleSync}
          />

          {/* Historie a poznámky */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-navy-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Historie</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {lead.historie.map(event => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center flex-shrink-0 text-xs">
                      {new Date(event.cas).getDate()}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">
                        {new Date(event.cas).toLocaleString()}
                      </div>
                      <div className="text-sm">{event.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Poznámky</h2>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 bg-navy-600 rounded px-3 py-2"
                    placeholder="Přidat poznámku..."
                  />
                  <button 
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Přidat
                  </button>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {lead.poznamky.map(note => (
                    <div key={note.id} className="bg-navy-600 p-3 rounded">
                      <div className="text-sm text-gray-400">
                        {new Date(note.cas).toLocaleString()}
                      </div>
                      <div className="text-sm">{note.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetail;