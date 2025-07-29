import { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import './App.css';

function App() {
  const [activeForm, setActiveForm] = useState('signup');

  return (
    <div className="app-container">
      <div className="hero-section">
        <h1>Welcome to Our Platform</h1>
        <p>Join us today to get started</p>
        
        <div className="auth-buttons">
          <button 
            className={`auth-btn ${activeForm === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveForm('signup')}
          >
            Sign Up
          </button>
          <button 
            className={`auth-btn ${activeForm === 'login' ? 'active' : ''}`}
            onClick={() => setActiveForm('login')}
          >
            Login
          </button>
        </div>
      </div>

      <div className="form-container">
        {activeForm === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default App;