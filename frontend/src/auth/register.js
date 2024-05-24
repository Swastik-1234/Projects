// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'
import Swal from 'sweetalert2';

function Register() {
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
   
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', formData,{
        headers: {
            'Content-Type': 'application/json'
          }
      });
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered.',
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form  className="register-form"  onSubmit={handleSubmit}>
     
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
       
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
