// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">E-commerce App</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/products">Explore Products</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
