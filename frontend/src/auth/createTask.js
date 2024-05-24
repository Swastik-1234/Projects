// import React, { useState } from 'react';
// import axios from 'axios';
// import { Typography, TextField, Button, Box } from '@mui/material';

// function CreateTask({ projectId, fetchTasks }) {
//     console.log("here",projectId);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/projects/${projectId}/tasks`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       console.log(response.data);
//       // Refresh tasks after creating a new task
//       fetchTasks();
//       // Reset form data
//       setFormData({ title: '', description: '' });
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         Create Task
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           required
//         />
//         <Box mt={2}>
//           <Button type="submit" variant="contained" color="primary">
//             Create Task
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// }

// export default CreateTask;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Typography, TextField, Button, Box } from '@mui/material';
// import { useParams,useNavigate} from 'react-router-dom';

// function CreateTask({ fetchTasks }) {
//   const { projectId } = useParams();
//   const navigate = useNavigate(); // Extract projectId using useParams
//   console.log("here", projectId);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/projects/${projectId}/tasks`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       console.log(response.data);
//          // Show success alert
//     alert('Task created successfully!');
//       // Refresh tasks after creating a new task
//       fetchTasks();
//       // Reset form data
//       setFormData({ title: '', description: '' });
//       navigate('/viewTasks/${projectId}');
//     } catch (error) {
//         if (error.response && error.response.status === 403) {
//             // Show alert for permission denied
//             alert('Only collaborators can create a task.');
//           } else {
//             console.error('Error creating task:', error);
//           }
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h6" gutterBottom>
//         Create Task
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           required
//         />
//         <Box mt={2}>
//           <Button type="submit" variant="contained" color="primary">
//             Create Task
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// }

// export default CreateTask;

import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

function CreateTask() {
  const { projectId } = useParams(); // Extract projectId using useParams
  const navigate = useNavigate(); // Get navigate function from React Router

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
        `http://localhost:3001/projects/${projectId}/tasks`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      // Show success alert
      alert('Task created successfully!');
      // Reset form data
      setFormData({ title: '', description: '' });
      // Navigate back to ViewTasks component
      navigate(`/viewTasks/${projectId}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Show alert for permission denied
        alert('Only collaborators can create a task.');
      } else {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Create Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
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
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default CreateTask;

