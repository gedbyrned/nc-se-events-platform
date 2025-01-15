import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';  
import NAV from './components/Nav';  
import EventsList from './components/Events';
import SelectEvent from './components/SelectEvent'; 
import SignIn from './components/SignIn';
import RegisterScreen from './components/RegisterScreen';  // For user/staff registration
import Profile from './components/Profile';

const App = () => {
  const [token, setToken] = useState(null); // Manage authentication token

  return (
    <>
      <Header />
      <NAV /> 
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<EventsList />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/events/:event_id" element={<SelectEvent />} />
        
        {/* Authentication Routes */}
        <Route path="/sign-in" element={<SignIn setToken={setToken} />} />
        
        {/* User Registration Routes */}
        <Route path="/sign-up" element={<RegisterScreen navigateToLogin={() => setToken(null)} />} /> 

        {/* Protected Route */}
        <Route 
          path="/profile" 
          element={token ? <Profile token={token} /> : <Navigate to="/sign-in" />} 
        />
      </Routes>
    </>
  );
};

export default App;
