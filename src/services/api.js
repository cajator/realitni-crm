// src/services/api.js
import axios from 'axios';

const api = {
  instance: axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  }),

  // Export dat do Poski
  exportToPoski: async (data) => {
    try {
      const response = await api.instance.post('/poski/export', data);
      return response.data;
    } catch (error) {
      console.error('Export do Poski selhal:', error);
      throw error;
    }
  },

  // Získání stavu z Poski
  getPoskiStatus: async (poskiId) => {
    try {
      const response = await api.instance.get(`/poski/status/${poskiId}`);
      return response.data;
    } catch (error) {
      console.error('Načtení stavu z Poski selhalo:', error);
      throw error;
    }
  }
};

export default api;