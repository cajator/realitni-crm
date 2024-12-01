// src/components/leads/PropertyMedia.js
import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Film, X } from 'lucide-react';

function PropertyMedia({ media, onUpload, onDelete }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="bg-navy-700 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Fotografie a média</h2>

      {/* Upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center mb-4 ${
          dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="hidden"
          id="file-upload"
          accept="image/*,video/*"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <Upload className="mb-2 text-gray-400" />
          <span className="text-sm text-gray-400">
            Přetáhněte sem soubory nebo klikněte pro výběr
          </span>
        </label>
      </div>

      {/* Media grid */}
      <div className="grid grid-cols-4 gap-4">
        {media.map((item, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square bg-navy-600 rounded-lg overflow-hidden">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Film className="text-gray-400" size={24} />
                </div>
              )}
            </div>
            <button
              onClick={() => onDelete(item.id)}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1 
                       opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyMedia;