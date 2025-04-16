import React, { useState } from 'react';
import API from '../api';

function AddEmployee({ onAdded }) {
    const [form, setForm] = useState({ name: '', role: '', salary: '' });

    const handleSubmit = async () => {
        await API.post('/employees', form);
        onAdded();
    };

    return (
        <div>
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Role" onChange={e => setForm({ ...form, role: e.target.value })} />
            <input placeholder="Salary" onChange={e => setForm({ ...form, salary: e.target.value })} />
            <button onClick={handleSubmit}>Add Employee</button>
        </div>
    );
}

export default AddEmployee;
