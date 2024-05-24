import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Typography ,Modal} from '@mui/material';

function CreateProject({ setProjects }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

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
      const response = await axios.post(
        'http://localhost:3001/projects/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's JWT token in the request headers
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Project created successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(response.data);
      // Append the newly created project to the projects list
      // setProjects((prevProjects) => [...prevProjects, response.data.project]);
    
      if (typeof setProjects === 'function') {
        setProjects((prevProjects) => [...prevProjects, response.data.project]);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      if (error.response && error.response.status === 403) {
        // Display an alert if the user is not authorized (e.g., not an admin)
        Swal.fire({
          icon: 'error',
          title: 'You are not authorized to create a project',
          text: 'Only admins can create projects',
        });
      } else {
        // Display a generic error alert for other errors
        Swal.fire({
          icon: 'error',
          title: 'Failed to create project',
          text: 'An error occurred while creating the project',
        });
      }
    }
  };


return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create Project
        </Button>
      </form>
    </div>
  );
}

export default CreateProject;


