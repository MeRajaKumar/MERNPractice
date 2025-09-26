import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getEmployees = () => axios.get(`${API_URL}/employees`);

export const createEmployee = (employee) => axios.post(`${API_URL}/employees`, employee);

export const getSubjects = () => axios.get(`${API_URL}/subjects`);

export const createSubject = (subject) => axios.post(`${API_URL}/subjects`, subject);

export const assignSubject = (assignment) => axios.post(`${API_URL}/subjects/assign`, assignment);
