import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, InputLabel, Select, MenuItem, Switch, Slider, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Facebook, Google, GitHub } from '@mui/icons-material';
import { FaTwitter } from 'react-icons/fa';

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