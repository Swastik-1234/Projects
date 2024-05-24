import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './home.css'; 
import Navbar from './navbar';
import Projects from './auth/projects';
import images from './kanban.jpg'
function Home() {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <img src={images} alt="Logo" className="logo-image" style={{ maxWidth: '700px', maxHeight: '600px' }} /> {/* Add your image here */}
      <Typography variant="h6" gutterBottom>Welcome to the Product-Management app</Typography>
      <div>
        <Link to="/register">
          {/* <Button variant="contained" color="primary" className="home-button">Register</Button> */}
        </Link>
        <Link to="/login">
          {/* <Button variant="contained" color="primary" className="home-button">Login</Button> */}
        </Link>
       
    
      </div>
      
    </div>
  );
}

export default Home;


