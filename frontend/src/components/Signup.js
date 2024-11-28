import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // Optional message state for user feedback

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData); // Log form data
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            console.log('Signup Response:', response.data); // Log backend response
            setMessage('Signup successful! Please login.');
        } catch (err) {
            console.error('Error Response:', err.response?.data || err.message); // Log backend error
            setMessage(err.response?.data?.error || 'Signup failed.');
        }
    };
    

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={formData.username} // Bind input value to state
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email} // Bind input value to state
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password} // Bind input value to state
                    onChange={handleChange}
                />
                <button type="submit">Signup</button>
            </form>
            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
};

export default Signup;
