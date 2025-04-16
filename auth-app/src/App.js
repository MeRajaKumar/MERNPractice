import React, { useState } from 'react';
import './styles/App.css';
import AuthModal from './components/AuthModal';

function App() {
  const [modalType, setModalType] = useState(null);

  return (
    <div className="app">
      <h1>Welcome to the Auth Portal 🚀</h1>
      <div className="buttons">
        <button className="action-btn" onClick={() => setModalType('login')}>Login to Your Account</button>
        <button className="action-btn" onClick={() => setModalType('signup')}>Create an Account</button>
        <button className="action-btn" onClick={() => setModalType('forgot')}>Forgot Password</button>
        <button className="action-btn" onClick={() => setModalType('changePassword')}>Change Password</button>
      </div>
      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </div>
  );
}

export default App;
