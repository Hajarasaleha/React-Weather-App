import React, { useState } from "react";
import axios from "axios";
import "./login.css";
export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log("Response:", res.data);
      const token = res.data.token; // Extract token from backend response
      localStorage.setItem("userToken", token);
      setToken(token);
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        alert(err.response.data.error || "Login failed");
      } else {
        console.error("Error:", err);
        alert("Login failed");
      }
    }
  };

  return (
    <div id="loginDiv" >
      <div>
      <h1>Login For WeatherApp</h1>
      <form
        onSubmit={handleSubmit}
      >
        <h2 >Login</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="submit"
        >
          Login
        </button>
      </form>
      </div>
    </div>
  );
}
