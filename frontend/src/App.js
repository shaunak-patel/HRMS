import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (status) => {
        setIsAuthenticated(status);
    };

    return (
        <Router>
            <div>
                <Navbar />
                <h1>My React App</h1>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;