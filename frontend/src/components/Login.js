import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token } = response.data;
    
            // Save the token to localStorage
            localStorage.setItem('token', token);
    
            // Debugging log for confirmation
            console.log('Login successful! Token:', token);
    
            // Redirect to dashboard
            window.location.href = '/Dashboard'; // This should trigger the navigation
        } catch (err) {
            console.error('Login Error:', err.response?.data || err.message);
            setMessage(err.response?.data?.error || 'Login failed.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
