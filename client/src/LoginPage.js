import React, { useState } from "react";

import './login.css';
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import { FaUser, FaEnvelope } from "react-icons/fa"; // Using FaEnvelope for email icon

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Inside your LoginPage component

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate based on the role
        if (data.role === 'Admin') {
          navigate('/admin/dashboard');
        } else if (data.role === 'Surveyor') {
          navigate('/surveyor/dashboard'); // Use the path to your SurveyorDashboard component
        } else {
          navigate('/dashboard'); // Default path for other users
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('There was an error logging in', error);
    }
  };


  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="forgot">
          <label><input type="checkbox" />Remember Me</label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;