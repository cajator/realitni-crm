import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Building } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="w-64 bg-navy-700 min-h-screen p-4">
      <nav className="space-y-2">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive ? 'bg-navy-600 text-white' : 'text-gray-400 hover:bg-navy-600 hover:text-white'
            }`
          }
        >
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/leads" 
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive ? 'bg-navy-600 text-white' : 'text-gray-400 hover:bg-navy-600 hover:text-white'
            }`
          }
        >
          <Building size={20} />
          <span>Příležitosti</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;