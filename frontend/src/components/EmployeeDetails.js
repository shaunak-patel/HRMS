import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserDetails(response.data);
            } catch (err) {
                console.error('Error fetching user details:', err.response?.data || err.message);
                setError('Failed to fetch user details.');
            }
        };

        fetchUserDetails();
    }, []);

    if (error) return <p>{error}</p>;
    if (!userDetails) return <p>Loading...</p>;

    return (
        <div>
            <h1>My Profile</h1>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Leave Balance:</strong> {userDetails.leaveBalance} days</p>
            <h2>Your Tasks:</h2>
            <ul>
                {userDetails.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
            <h2>Performance Metrics:</h2>
            <p><strong>Total Tasks:</strong> {userDetails.performanceMetrics.totalTasks}</p>
            <p><strong>Completed Tasks:</strong> {userDetails.performanceMetrics.completedTasks}</p>
        </div>
    );
};

export default EmployeeDetails;
