// Navbar.js
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
function Navbar() {

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token') || null;
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">
      
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {accessToken ? (
          <li>
            <PersonIcon onClick={handleLogout} sx={{ backgroundColor: 'primary.main', cursor: 'pointer', marginLeft: '10px' }}>
              <Logout />
            </PersonIcon>
          </li>
        ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
