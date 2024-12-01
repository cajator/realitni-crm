import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './Routes';  // Změna názvu importu

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-navy-800">
        <Layout>
          <AppRoutes />  {/* Použijeme stejný název jako při importu */}
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;