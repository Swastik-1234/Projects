// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'
function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    shippingAddress: '',
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
      const response = await axios.post('http://localhost:3001/auth/register', formData,{
        headers: {
            'Content-Type': 'application/json'
          }
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form  className="register-form"  onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
