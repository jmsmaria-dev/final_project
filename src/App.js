import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Menu from './Menu/Menu';
import Footer from './Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import DashboardPage from './Dashboard/DashboardPage';
import SummaryPage from './Summary/SummaryPage';
import ReportsPage from './Reports/ReportsPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Menu />
          <div className="mainContainer">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/summary" element={<ProtectedRoute><SummaryPage /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

