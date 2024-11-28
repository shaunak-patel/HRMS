import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ensure this matches your backend's route

// Signup API
export const signup = async (userData) => {
    return await axios.post(`${API_URL}/signup`, userData);
};

// Login API
export const login = async (credentials) => {
    return await axios.post(`${API_URL}/login`, credentials);
};
