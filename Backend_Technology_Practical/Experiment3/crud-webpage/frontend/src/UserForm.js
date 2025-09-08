import React, { useState, useEffect } from 'react';

const UserForm = ({ addOrUpdateUser, currentUser }) => {
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  useEffect(() => {
    if (currentUser) setForm(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateUser(form);
    setForm({ name: '', email: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
