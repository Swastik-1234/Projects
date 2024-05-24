// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function Home() {
   
  return (
    <div className="home-container">
        {/* <Navbar /> */}
      <h2>Welcome to the E-commerce App</h2>
    
      <div>
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/products">
          <button className="home-button">Explore Products</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
