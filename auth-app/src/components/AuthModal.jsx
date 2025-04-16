import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ChangePasswordForm from './ChangePasswordForm';  // Default import
import './AuthModal.css';

const AuthModal = ({ type, onClose }) => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  const renderForm = () => {
    const props = { onSubmit: handleFormSubmit };

    switch (type) {
      case 'login': return <LoginForm {...props} />;
      case 'signup': return <SignupForm {...props} />;
      case 'forgot': return <ForgotPasswordForm {...props} />;
      case 'changePassword': return <ChangePasswordForm {...props} />;  // Render Change Password form
      default: return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="back-btn" onClick={onClose}>← Back</button>
        {submittedData ? (
          <div className="popup">
            <h2>Submitted Details</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          renderForm()
        )}
      </div>
    </div>
  );
};

export default AuthModal;
