import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchUsers = () => API.get('/users');
export const createUser = (data) => API.post('/users', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
