import React, { useState } from 'react';
import API from '../api';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async () => {
        try {
            const res = await API.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            onLogin();
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={loginHandler}>Login</button>
        </div>
    );
}

export default Login;
