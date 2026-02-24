import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Tuodaan komponentit ja sivut
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import UserBookings from './pages/UserBookings';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  // Simuloidaan kirjautumistilaa
  const [isLoggedIn] = useState(true); 
  const [userRole] = useState<'user' | 'admin'>('user');

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans">
        <Navbar />

        {/* Poistettu ylimääräiset container-rajoitukset, jotta komponentit hallitsevat omaa asetteluaan */}
        <main>
          <Routes>
            {/* JULKISET REITIT */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* KÄYTTÄJÄN REITIT */}
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/bookings" 
              element={isLoggedIn ? <UserBookings /> : <Navigate to="/login" />} 
            />
            
            {/* ADMIN REITIT */}
            <Route 
              path="/admin" 
              element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />

            {/* OLETUSREITTI (Etusivu) */}
            <Route 
              path="/" 
              element={<Navigate to={isLoggedIn ? (userRole === 'admin' ? "/admin" : "/dashboard") : "/login"} />} 
            />
          </Routes>
        </main>

        <footer className="text-center py-12 text-gray-400 text-xs font-medium tracking-widest uppercase">
          © 2026 BookApp • Modern Booking Experience
        </footer>
      </div>
    </Router>
  );
};

export default App;
