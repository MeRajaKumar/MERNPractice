import React, { useState } from 'react';
import LoginForm from './LoginForm';  // Add this import
import SignupForm from './SignupForm'; // Add this import
import { IconButton } from '@mui/material';
import { Facebook, Google, GitHub } from '@mui/icons-material';
import { FaTwitter } from 'react-icons/fa';
import './AuthForms.css';

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>
          Login
        </button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>
          Sign Up
        </button>
      </div>
      
      {isLogin ? <LoginForm /> : <SignupForm />}
      
      <div className="social-auth">
        <p>Or continue with:</p>
        <div className="social-icons">
          <IconButton><Google /></IconButton>
          <IconButton><Facebook /></IconButton>
          <IconButton><FaTwitter /></IconButton>
          <IconButton><GitHub /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;