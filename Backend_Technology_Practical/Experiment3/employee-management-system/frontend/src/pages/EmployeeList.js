import React, { useEffect, useState } from "react";
import { getEmployees } from "../api/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.length === 0 && <li>No employees found.</li>}
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} (ID: {emp.eId}) - Email: {emp.mail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
