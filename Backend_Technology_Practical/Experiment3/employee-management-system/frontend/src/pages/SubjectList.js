import React, { useEffect, useState } from "react";
import { getSubjects } from "../api/api";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error("Failed to fetch subjects", error);
    }
  };

  return (
    <div>
      <h2>Subject List</h2>
      <ul>
        {subjects.length === 0 && <li>No subjects found.</li>}
        {subjects.map((sub) => (
          <li key={sub._id}>
            {sub.subjectName} (Subject ID: {sub.subjectId}), Experience: {sub.expInTeaching} years
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;
