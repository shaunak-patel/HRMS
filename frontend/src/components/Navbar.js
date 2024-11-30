import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav>
            <ul>
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/employee-details">My Profile</Link>
                        </li>
                        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            Logout
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
