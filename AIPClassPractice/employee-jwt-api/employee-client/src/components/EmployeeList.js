import React, { useEffect, useState } from 'react';
import API from '../api';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    const fetchData = async () => {
        const res = await API.get('/employees');
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h3>Employee List</h3>
            {employees.map(emp => (
                <div key={emp._id}>{emp.name} - {emp.role} - ₹{emp.salary}</div>
            ))}
        </div>
    );
}

export default EmployeeList;
