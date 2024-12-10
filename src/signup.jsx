import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./signup.css"

export default function Signup({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/signup", {
        username,
        email,
        password,
      });

      // Assume the backend returns a token upon successful signup
      const token = response.data.token || "dummyToken"; // Replace with actual token
      localStorage.setItem("userToken", token); // Save token in localStorage
      setToken(token); // Set the token
      setMessage("Signup successful! Redirecting to WeatherApp...");
      setTimeout(() => {
        navigate("/weather");
      }, 1000);
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="signupDiv">
   
    <div >
    <h1 className="title">Signup For WeatherApp</h1>
      <form onSubmit={handleSubmit} id="form">
      <h2 className="signup">Signup</h2>
        {/* Form inputs */}
        <div>
       
          <label htmlFor="username">Username:</label><br></br>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label><br></br>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label><br></br>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label><br></br>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}
