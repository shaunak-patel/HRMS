import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard! Here you can see your activities and statistics.</p>
            {/* You can add more components or data visualizations here */}
            <ul>
                <li>Total Posts: 10</li>
                <li>Total Comments: 50</li>
                <li>New Messages: 5</li>
            </ul>
        </div>
    );
};

export default Dashboard;