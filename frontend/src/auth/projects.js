import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom'; 
import { Card, CardContent, Typography, Container, Grid ,Button,Avatar} from '@mui/material';
import CreateTask from './createTask';
import proj from '../proj_back.jpg'
import { Logout } from '@mui/icons-material';
function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token') || null;
  // useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/projects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include the user's JWT token in the request headers
          }
        });
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

  //   fetchProjects();
  // }, []);
  useEffect(() => {
    fetchProjects();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

return (
    <Container>
     
        <Button component={Link} to="/createProject" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Create Project
      </Button>
      <Grid container spacing={3}>
        { projects && projects.map(project => (
          <Grid item key={project._id} xs={12} sm={6} md={4}>
            <Card style={{backgroundImage: `url(${proj})`, backgroundSize: 'cover', height: '200px'}}>
            {/* <img src={proj} alt="Project" style={{ width: '100%', height: '200px', objectFit: 'cover' }} /> */}
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography color="text.secondary">
                  {project.description}
                </Typography>
                <Typography color="text.secondary">
                  Collaborators: {project.collaborators.length}
                </Typography>
                <Typography color="text.secondary">
                  Tasks: {project.tasks.length}
                </Typography>
                <Typography color="text.secondary">
                  Created By: {project.createdBy}
                </Typography>
                {/* <CreateTask projectId={project._id.valueOf()} fetchTasks={fetchProjects} /> Pass projectId as prop */}
                <Button component={Link} to={`/viewTasks/${project._id}`} variant="contained" color="primary">
                  View Tasks
                </Button>
                <Button component={Link} to={`/addCollaborator/${project._id.valueOf()}`} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                  Add Collaborator
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Projects;


//   return (
//     <div>
//       <h1>Projects</h1>
//       {projects.map((project) => (
//         <div key={project._id}>
//           <h3>{project.title}</h3>
//           <p>{project.description}</p>
//           <p>Created By: {project.createdBy}</p>
//           <p>Collaborators: {project.collaborators.length}</p>
//           <p>Tasks: {project.tasks.length}</p>
//         </div>
//       ))}
//     </div>
//   );
// }





