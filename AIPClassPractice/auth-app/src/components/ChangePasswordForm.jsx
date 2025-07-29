import React, { useState } from 'react';

const ChangePasswordForm = ({ onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match!");
    } else {
      onSubmit({ type: 'ChangePassword', oldPassword, newPassword });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePasswordForm;  // Ensure default export
