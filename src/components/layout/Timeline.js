// src/components/layout/Timeline.js
import React from 'react';

function Timeline({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        Zatím žádné události
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm">
              {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div>
            <div className="text-sm text-gray-400">
              {new Date(event.timestamp).toLocaleDateString()}
            </div>
            <div className="font-medium">{event.title}</div>
            {event.description && (
              <div className="text-sm text-gray-400">{event.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;