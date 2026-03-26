import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
