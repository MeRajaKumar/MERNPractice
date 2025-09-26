import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from './api';
import UserForm from './UserForm';
import UserList from './UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } = await fetchUsers();
    setUsers(data);
  };

  const addOrUpdateUser = async (user) => {
    if (user._id) {
      await updateUser(user._id, user);
    } else {
      await createUser(user);
    }
    setCurrentUser(null);
    loadUsers();
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN CRUD App</h1>
      <UserForm addOrUpdateUser={addOrUpdateUser} currentUser={currentUser} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
