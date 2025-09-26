import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import SubjectList from "./pages/SubjectList";

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/employees" style={{ marginRight: '10px' }}>Employees</Link>
        <Link to="/subjects">Subjects</Link>
      </nav>
      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/subjects" element={<SubjectList />} />
      </Routes>
    </Router>
  );
}

export default App;
