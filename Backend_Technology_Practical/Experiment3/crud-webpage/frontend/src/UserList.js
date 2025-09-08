import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Age</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
