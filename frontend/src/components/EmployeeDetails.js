import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetails = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        leaveBalance: 0,
        tasks: '',
    });

    useEffect(() => {
        // Fetch user data
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    leaveBalance: response.data.leaveBalance,
                    tasks: response.data.tasks.join(', '),
                });
            } catch (err) {
                console.error('Error fetching user details:', err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/update', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Details updated successfully!');
        } catch (err) {
            console.error('Error updating details:', err);
        }
    };

    return (
        <div className="container">
            <h1>Employee Details</h1>
            <form onSubmit={handleSubmit}>
                <label>Full Name</label>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Full Name"
                />

                <label>Email</label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    disabled
                />

                <label>Leave Balance</label>
                <div className="input-group">
                    <span>$</span>
                    <input
                        type="number"
                        name="leaveBalance"
                        value={formData.leaveBalance}
                        onChange={handleChange}
                        placeholder="Leave Balance"
                    />
                </div>

                <label>Tasks (Comma-Separated)</label>
                <textarea
                    name="tasks"
                    value={formData.tasks}
                    onChange={handleChange}
                    placeholder="Tasks (Comma-separated)"
                ></textarea>

                <button type="submit">Update Details</button>
            </form>
        </div>
    );
};

export default EmployeeDetails;
