import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import WeatherApp from "./WeatherApp";
import Report from "./Report";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken")); // Token for authentication

  return (
    <Router>
      <Routes>
        {/* Default route redirects to Signup if not logged in */}
        <Route path="/" element={token ? <Navigate to="/weather" /> : <Navigate to="/signup" />} />
        
        {/* Signup Page */}
        <Route
          path="/signup"
          element={!token ? <Signup setToken={setToken} /> : <Navigate to="/weather" />}
        />
        
        {/* Login Page */}
        <Route
          path="/login"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/weather" />}
        />
        
        {/* WeatherApp Page */}
        <Route
          path="/weather"
          element={token ? <WeatherApp setToken={setToken}/> : <Navigate to="/login" />}
        />
        
        {/* Report Page */}
        <Route
          path="/report"
          element={token ? <Report userToken={token} /> : <Navigate to="/login" />}
        />
        
        {/* For default routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
