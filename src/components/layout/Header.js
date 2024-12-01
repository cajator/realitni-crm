import React from 'react';

function Header() {
  return (
    <header className="bg-navy-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white font-semibold">
            RM
          </div>
          <div>
            <h2 className="text-white font-medium">Robert Makléř</h2>
            <p className="text-sm text-gray-400">+420 777 888 999</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            + Nová příležitost
          </button>
          <nav className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white">
              Notifikace
            </button>
            <button className="text-gray-400 hover:text-white">
              Kalendář
            </button>
            <button className="text-gray-400 hover:text-white">
              Profil
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;