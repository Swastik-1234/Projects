// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './login.css'
// import Swal from 'sweetalert2';
// import images from '../jira.png'
// import { Logout } from '@mui/icons-material'; 
// import { Card, CardContent, Typography, TextField, Button, Grid,Avatar } from '@mui/material';
// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/'); // Redirect to the home page after logout
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post('http://localhost:3001/auth/login', formData,{
//       headers: {
//           'Content-Type': 'application/json'
//         }

//     });
    
//     const  accessToken  = response.data.token;
//     console.log(accessToken);
//     console.log(response.data);
//     localStorage.setItem('token', accessToken);
  
//     Swal.fire({
//       icon: 'success',
//       title: 'Login Successful',
//       text: 'You have successfully logged in.',
//     });
//     navigate('/projects')

//   } catch (error) {
//     console.error(error);
//   }
// };

// return (
//   <div className="login-container">
//     <h2>Login</h2>
//     <form  className="login-form" onSubmit={handleSubmit}>
//       <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//       <button type="submit">Login</button>
//     </form>
//     {accessToken !== null && ( // Check if accessToken is not null
//         <Avatar onClick={handleLogout} sx={{ backgroundColor: 'primary.main', cursor: 'pointer', marginTop: '20px' }}>
//           <Logout />
//         </Avatar>
//       )}
//   </div>
// );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login2.css';
import Swal from 'sweetalert2';
import { Avatar, Button, Typography, TextField, Container, Grid ,Box} from '@mui/material';
import { Logout } from '@mui/icons-material';
import logininamges from '../jira.jpg'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token') || null; // Initialize accessToken with localStorage value or null if not found

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to the home page after logout
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const accessToken = response.data.token; // Set accessToken after successful login
      localStorage.setItem('token', accessToken);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in.',
      });

      navigate('/projects');
    } catch (error) {
      console.error(error);
    }
  };


return (
  <Container maxWidth="sm">
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <Logout />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  </Container>
);
}
export default Login;



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/auth/login', formData,{
//         headers: {
//             'Content-Type': 'application/json'
//           }
  
//       });
      
//       const  accessToken  = response.data.token;
//       console.log(accessToken);
//       console.log(response.data);
//       localStorage.setItem('token', accessToken);
    
//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         text: 'You have successfully logged in.',
//       });
//       navigate('/projects')
  
//     } catch (error) {
//       console.error(error);
//     }
//   };


// return (
//   <div className="login-container">
//     <Card className="login-form-container">
//       <CardContent>
//         <Typography variant="h5" gutterBottom>Login</Typography>
//         <form className="login-form" onSubmit={handleSubmit}>
//           <TextField
//             type="email"
//             label="Email"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             required
//           />
//           <TextField
//             type="password"
//             label="Password"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Login
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//     <div className="login-image-container">
//       <img className="login-image" src={images} alt="Jira Logo" />
//     </div>
//   </div>
// );
// }

// export default Login;



//   return (
//     <div className="login-container">
//      {/* <img className="login-image" src={images} alt="Jira Logo" /> */}
      
//       {/* <h2>Login</h2> */}
    
      
//       <form  className="login-form" onSubmit={handleSubmit}>
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
    
//       <div className="login-image-container">
//       <img className="login-image" src={images} alt="Jira Logo" />
//     </div>
//     </div>
//   );
// }
