// src/components/leads/LeadDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Home,
  Square,
  Currency,
  Car,
  Zap,
  Building,
  Edit2,
  Save,
  X,
  Upload,
  RefreshCw
} from 'lucide-react';
import api from '../../../realitni-crm/src/services/api';
import LeadStatus from './LeadStatus';
import ParametersList from './ParametersList';
import Timeline from '../layout/Timeline';
import SellerInfo from './SellerInfo';

function LeadDetail() {
  const { id } = useParams();
  const [newNote, setNewNote] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [editingData, setEditingData] = useState(null);
  
  const [lead, setLead] = useState({
    id,
    nazev: "Prodej bytu 3+kk",
    ulice: "Budějovická 15",
    mesto: "Praha 4",
    psc: "140 00",
    lat: 50.0461389,
    lng: 14.4516667,
    cena: "5 300 000 Kč",
    stav: "zajem_nepotvrzen",
    
    parametry: {
      zakladni: {
        typ_nemovitosti: "Byt",
        dispozice: "3+kk",
        plocha: 75,
        stav_objektu: "Velmi dobrý",
        vlastnictvi: "Osobní",
      },
      rozsirene: {
        patro: 3,
        celkem_podlazi: 8,
        vytah: true,
        balkon: false,
        lodzie: false,
        terasa: true,
        sklep: "Ano, 4m²",
        garaz: "Ano",
        parkovaci_stani: 1,
        rok_vystavby: 1985,
        rok_rekonstrukce: 2015,
        stavba: "Panelová",
        vytapeni: "Ústřední dálkové",
        energeticka_trida: "C",
        internet: true,
        vybaveni: "Částečně zařízený",
        k_nastehovani: "Ihned",
        orientace: "JV, Z"
      }
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
      cena_za_lead: null,
      provize_castka: null,
      datum_prodeje: null
    },

    external: {
      poski_id: null,
      lastSync: null,
      poskiData: null
    },
    historie: [],
    poznamky: []
  });

  // Pomocné funkce pro mapy
  const getGoogleMapsUrl = () => {
    const address = encodeURIComponent(`${lead.ulice}, ${lead.mesto}`);
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  const getMapyCzUrl = () => {
    return `https://mapy.cz/zakladni?x=${lead.lng}&y=${lead.lat}&z=17`;
  };

  // Event handlery
  const handleStartEditing = (section, data) => {
    setEditingSection(section);
    setEditingData(data ? { ...data } : null);
  };

  const handleCancelEditing = () => {
    setEditingSection(null);
    setEditingData(null);
  };

  const handleHeaderUpdate = (e) => {
    e.preventDefault();
    if (!editingData) return;

    setLead(prev => ({
      ...prev,
      ...editingData,
      historie: [
        {
          id: Date.now(),
          cas: new Date().toISOString(),
          typ: 'uprava',
          text: 'Základní údaje byly aktualizovány'
        },
        ...prev.historie
      ]
    }));
    setEditingSection(null);
    setEditingData(null);
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

  const handleExportToPoski = async () => {
    try {
      const response = await api.exportToPoski({
        nemovitost: {
          typ: lead.parametry.zakladni.typ_nemovitosti,
          dispozice: lead.parametry.zakladni.dispozice,
          plocha: lead.parametry.zakladni.plocha,
          stav: lead.parametry.zakladni.stav_objektu,
          vlastnictvi: lead.parametry.zakladni.vlastnictvi,
          lokalita: `${lead.ulice}, ${lead.mesto}`,
          cena: lead.cena,
          ...lead.parametry.rozsirene
        },
        kontakt: lead.prodavajici
      });
      
      setLead(prev => ({
        ...prev,
        external: {
          ...prev.external,
          poski_id: response.poski_id,
          lastSync: new Date().toISOString()
        },
        historie: [
          {
            id: Date.now(),
            cas: new Date().toISOString(),
            typ: 'export',
            text: 'Nemovitost byla exportována do Poski Real'
          },
          ...prev.historie
        ]
      }));
    } catch (error) {
      console.error('Chyba při exportu do Poski:', error);
    }
  };

  const handleUpdateFromPoski = async () => {
    if (!lead.external?.poski_id) return;
    
    try {
      const poskiData = await api.getPoskiStatus(lead.external.poski_id);
      
      if (poskiData.stav === 'REZERVOVANO' || poskiData.stav === 'PRODANO') {
        setLead(prev => ({
          ...prev,
          stav: poskiData.stav.toLowerCase(),
          obchodni_info: {
            ...prev.obchodni_info,
            provize_castka: poskiData.provize?.castka,
            cena_za_lead: poskiData.cena_za_lead,
            datum_prodeje: poskiData.datum_prodeje
          },
          external: {
            ...prev.external,
            lastSync: new Date().toISOString(),
            poskiData: poskiData
          },
          historie: [
            {
              id: Date.now(),
              cas: new Date().toISOString(),
              typ: 'status_update',
              text: `Aktualizace stavu z Poski Real: ${poskiData.stav}`
            },
            ...prev.historie
          ]
        }));
      }
    } catch (error) {
      console.error('Chyba při aktualizaci z Poski:', error);
    }
  };

  const handleStatusChange = (newStatus, label) => {
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
    <div className="container mx-auto max-w-7xl">
      {/* Hlavička */}
      <div className="bg-navy-700 p-6 rounded-lg mb-6">
        {editingSection === 'header' ? (
          <form onSubmit={handleHeaderUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Název</label>
                <input
                  type="text"
                  value={editingData.nazev}
                  onChange={e => setEditingData({...editingData, nazev: e.target.value})}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cena</label>
                <input
                  type="text"
                  value={editingData.cena}
                  onChange={e => setEditingData({...editingData, cena: e.target.value})}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ulice</label>
                <input
                  type="text"
                  value={editingData.ulice}
                  onChange={e => setEditingData({...editingData, ulice: e.target.value})}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Město</label>
                <input
                  type="text"
                  value={editingData.mesto}
                  onChange={e => setEditingData({...editingData, mesto: e.target.value})}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">PSČ</label>
                <input
                  type="text"
                  value={editingData.psc}
                  onChange={e => setEditingData({...editingData, psc: e.target.value})}
                  className="w-full bg-navy-600 rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancelEditing}
                className="px-3 py-1.5 bg-gray-600 rounded hover:bg-gray-700 flex items-center"
              >
                <X size={16} className="mr-1.5" />
                Zrušit
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-green-600 rounded hover:bg-green-700 flex items-center"
              >
                <Save size={16} className="mr-1.5" />
                Uložit
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">{lead.nazev}</h1>
                <button
                  onClick={() => handleStartEditing('header', {
                    nazev: lead.nazev,
                    ulice: lead.ulice,
                    mesto: lead.mesto,
                    psc: lead.psc,
                    cena: lead.cena
                  })}
                  className="p-1.5 hover:bg-navy-600 rounded-lg"
                >
                  <Edit2 size={16} />
                </button>
              </div>
              
              <div className="flex items-center text-gray-300 space-x-2">
                <MapPin size={16} />
                <span>{lead.ulice}, {lead.mesto} {lead.psc}</span>
                <div className="ml-3 space-x-2 text-sm">
                  <a 
                    href={getGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Google Maps
                  </a>
                  <span className="text-gray-500">|</span>
                  <a 
                    href={getMapyCzUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Mapy.cz
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Home size={16} className="mr-2" />
                  {lead.parametry.zakladni.typ_nemovitosti}
                </div>
                <div className="flex items-center">
                  <Square size={16} className="mr-2" />
                  {lead.parametry.zakladni.plocha} m²
                </div>
                <div className="flex items-center">
                  <Building size={16} className="mr-2" />
                  {lead.parametry.rozsirene.patro}. patro z {lead.parametry.rozsirene.celkem_podlazi}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold">{lead.cena}</div>
              <div className="text-sm text-gray-400">+ provize {lead.obchodni_info.provize}</div>
            </div>
          </div>
        )}
      </div>

      {/* Hlavní obsah */}
      <div className="grid grid-cols-12 gap-6">
        {/* Levý sloupec */}
        <div className="col-span-4 space-y-6">
          <ParametersList
            title="Základní parametry"
            parameters={lead.parametry.zakladni}
            isEditing={editingSection === 'basic'}
            onStartEdit={() => setEditingSection('basic')}
            onSave={(newParams) => {
              setLead(prev => ({
                ...prev,
                parametry: {
                  ...prev.parametry,
                  zakladni: newParams
                }
              }));
              setEditingSection(null);
            }}
            onCancel={() => setEditingSection(null)}
          />

          <ParametersList
            title="Rozšířené parametry"
            parameters={lead.parametry.rozsirene}
            isEditing={editingSection === 'extended'}
            onStartEdit={() => setEditingSection('extended')}
            onSave={(newParams) => {
              setLead(prev => ({
                ...prev,
                parametry: {
                  ...prev.parametry,
                  rozsirene: newParams
                }
              }));
              setEditingSection(null);
            }}
            onCancel={() => setEditingSection(null)}
          />

          <SellerInfo 
            seller={lead.prodavajici}
            onUpdate={handleSellerUpdate}
          />

          {/* Poski integrace - zmenšená verze */}
          <div className="bg-navy-700 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Poski Real</h3>
              <div className="flex space-x-3">
                <button
                  onClick={handleExportToPoski}
                  className="px-3 py-1.5 text-sm bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center"
                  disabled={lead.external?.poski_id}
                >
                  <Upload size={16} className="mr-1.5" />
                  Export
                </button>
                <button
                  onClick={handleUpdateFromPoski}
                  className="px-3 py-1.5 text-sm bg-green-500 rounded-lg hover:bg-green-600 flex items-center"
                  disabled={!lead.external?.poski_id}
                >
                  <RefreshCw size={16} className="mr-1.5" />
                  Aktualizovat
                </button>
              </div>
            </div>
            {lead.external?.poski_id && (
              <div className="mt-3 text-sm text-gray-400">
                ID: {lead.external.poski_id}
                {lead.external.poskiData?.stav && (
                  <span className="ml-2">| Stav: {lead.external.poskiData.stav}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pravý sloupec */}
        <div className="col-span-8 space-y-6">
          {/* Status */}
          <div className="bg-navy-700 p-6 rounded-lg">
            <LeadStatus
              currentStatus={lead.stav}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Historie a poznámky */}
          <div className="grid grid-cols-2 gap-6">
            {/* Historie */}
            <div className="bg-navy-700 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Historie</h2>
              <Timeline events={lead.historie} />
            </div>

            {/* Poznámky */}
            <div className="bg-navy-700 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Poznámky</h2>
              <div className="space-y-4">
                <div>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full min-h-[100px] bg-navy-600 rounded-lg px-4 py-3 resize-vertical"
                    placeholder="Přidat poznámku..."
                    rows={4}
                  />
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                      disabled={!newNote.trim()}
                    >
                      Přidat poznámku
                    </button>
                  </div>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {lead.poznamky.map(note => (
                    <div key={note.id} className="bg-navy-600 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">
                        {new Date(note.cas).toLocaleString()}
                      </div>
                      <div className="text-sm whitespace-pre-wrap">{note.text}</div>
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