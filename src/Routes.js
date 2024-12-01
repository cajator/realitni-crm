import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './components/leads/LeadDetail';  // Ujistíme se o správné cestě

function AppRoutes() {  // Přejmenujeme na AppRoutes
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/leads/:id" element={<LeadDetail />} />
    </Routes>
  );
}

export default AppRoutes;  // Exportujeme jako AppRoutes