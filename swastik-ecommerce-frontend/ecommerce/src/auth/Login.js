// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData,{
        headers: {
            'Content-Type': 'application/json'
          }
  
      });
      
      //const { accessToken } = response.data;
      const dat=response.data;
      console.log(dat);
      //console.log(response.data)
      //console.log(accessToken);
      localStorage.setItem('token', dat);
     navigate('/myorders'); // Redirect to dashboard or any other page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form  className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
