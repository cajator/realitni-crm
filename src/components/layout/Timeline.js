// src/components/layout/Timeline.js
import React from 'react';
import { 
  MessageSquare, 
  RefreshCw, 
  Upload, 
  User, 
  AlertCircle,
  Check
} from 'lucide-react';

function Timeline({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        Zatím žádné události
      </div>
    );
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'poznamka':
        return <MessageSquare size={14} />;
      case 'sync':
      case 'status_update':
        return <RefreshCw size={14} />;
      case 'export':
        return <Upload size={14} />;
      case 'prodavajici':
        return <User size={14} />;
      case 'zmena_stavu':
        return <Check size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffDays = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Dnes ' + eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Včera ' + eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return eventDate.toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Vertikální čára */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-navy-600" />

      {events.map((event) => (
        <div key={event.id} className="flex items-start space-x-3 relative">
          <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center flex-shrink-0 z-10">
            {getEventIcon(event.type)}
          </div>
          <div className="flex-1 bg-navy-600 rounded-lg p-3">
            <div className="text-sm text-gray-400">
              {formatDate(event.timestamp)}
            </div>
            <div className="text-sm mt-1 whitespace-pre-wrap">{event.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;