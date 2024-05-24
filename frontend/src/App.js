


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './auth/register';
import Login from './auth/login';
import ViewTasks from './auth/ViewTasks';
import CreateProject from './auth/createProject';
import Home from './home';
import AddCollaborator from './auth/addCollaborator';
import Projects from './auth/projects';
import Navbar from './navbar';
import { Container } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreateTask from './auth/createTask';
import TaskDetails from './auth/TaskDetails';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createProject" element={<CreateProject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/viewTasks/:projectId" element={<ViewTasks />} />
            <Route path="/addCollaborator/:projectId" element={<AddCollaborator />} />
            <Route path="/createTask/:projectId" element={<CreateTask />} />
            <Route path="/taskDetails/:projectId/:taskId" element={<TaskDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default function DndApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  );
}

