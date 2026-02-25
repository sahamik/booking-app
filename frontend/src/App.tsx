import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Tuodaan komponentit ja sivut
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import UserBookings from './pages/UserBookings';
import AdminBookings from './pages/AdminBookings';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import NewBooking from './pages/NewBooking';
import AdminUsers from './pages/AdminUsers';

const App: React.FC = () => {
  // Simuloidaan kirjautumistilaa
  const [isLoggedIn] = useState(true); 
  const [userRole] = useState<'user' | 'admin'>('admin');

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans">
        <Navbar />

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
            <Route 
              path="/new-booking" 
              element={isLoggedIn ? <NewBooking /> : <Navigate to="/login" />} 
            />
            <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
            
            {/* ADMIN REITIT */}
            <Route 
              path="/admin" 
              element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            <Route path="/admin/bookings" element={isLoggedIn && userRole === 'admin' ? <AdminBookings /> : <Navigate to="/login" />} />
            <Route path="/admin/users" element={isLoggedIn && userRole === 'admin' ? <AdminUsers /> : <Navigate to="/login" />} />

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
