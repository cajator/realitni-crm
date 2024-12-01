import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Settings, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-700 rounded-lg px-3 py-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Hledat..."
              className="bg-transparent border-none outline-none px-2 text-sm"
            />
          </div>

          <div className="flex space-x-2">
            <Link to="/uvery" className="px-3 py-1 rounded hover:bg-gray-700">Úvěry</Link>
            <Link to="/pojisteni" className="px-3 py-1 rounded hover:bg-gray-700">Pojištění</Link>
            <Link to="/investice" className="px-3 py-1 rounded hover:bg-gray-700">Investice</Link>
            <Link to="/vse" className="px-3 py-1 rounded hover:bg-gray-700">Vše</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-700 rounded">
            <User className="w-5 h-5" />
            <span className="text-sm">Profil</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;