


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,Link} from 'react-router-dom';
import { Grid, Card, CardContent, Typography,Button } from '@mui/material';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd'; // Import useDrag hook
import { ItemTypes } from './ItemTypes'; // Define ItemTypes in a separate file
import {createTask} from './createTask'

import TaskDetailsDialog from './TaskDetails';
function ViewTasks() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchTasks = async (callback) => {
    try {
      const response = await axios.get(`http://localhost:3001/projects/${projectId}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(response.data.tasks);
      if (callback && typeof callback === 'function') {
        callback(); // Execute the callback function if provided and it's a function
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const moveTask = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3001/projects/tasks/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(`Task moved successfully to ${newStatus}`);
      fetchTasks(); // Refresh tasks after moving
    } catch (error) {
      console.error('Error moving task:', error);
      if (error.response && error.response.status === 403) {
        // Alert user when unauthorized to update task status
        alert('You are not authorized to update the task status.');
      }
    }
  };

  
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setDialogOpen(true);
    axios.get(`http://localhost:3001/projects/${projectId}/tasks/${task._id}/contributors`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {
        const updatedTask = { ...task, contributors: response.data.contributors };
        setSelectedTask(updatedTask);
    }).catch(error => {
        console.error('Error fetching contributors:', error);
    });
};

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDrop = (status) => (item) => {
    moveTask(item.taskId, status);
  };

  const [, dropTodo] = useDrop({
    accept: ItemTypes.TASK,
    drop: handleDrop('todo')
  });

  const [, dropInProgress] = useDrop({
    accept: ItemTypes.TASK,
    drop: handleDrop('inprogress')
  });

  const [, dropReview] = useDrop({
    accept: ItemTypes.TASK,
    drop: handleDrop('review')
  });

  const [, dropCompleted] = useDrop({
    accept: ItemTypes.TASK,
    drop: handleDrop('completed')
  });

  const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.TASK,
      item: { taskId: task._id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    });

    return (
      <div
        ref={drag}
        onClick={()=>handleTaskClick(task)}
        style={{ opacity: isDragging ? 0.5 : 1 ,
          border: '1px solid #ccc', // Add border to each task
          borderRadius: '4px', // Add border radius for styling
          padding: '8px', // Add padding for spacing
          marginBottom: '8px', // Add margin bottom for spacing between tasks
          backgroundColor: '#f9f9f9'
        }}
      >
            <div style={{
        border: '1px solid #ccc', // Add border to the title box
        borderRadius: '4px', // Add border radius for styling
        padding: '8px', // Add padding for spacing
        marginBottom: '8px', // Add margin bottom for spacing between title and description
        backgroundColor: '#eccba4' ,// Add a different background color to differentiate
        // position: 'sticky', // Make the section name sticky
        //   top: 0, // Stick to the top of the card
        //   zIndex: 1 // Ensure it's above the content
      }}>
        <Typography variant="subtitle1" component="div" color="primary">
          <strong>{task.title}</strong>
        </Typography>
        </div>
        <Typography variant="body2" component="div" color="secondary">
          {task.description}
        </Typography>
        <Typography variant="body2" component="div" color="secondary">
          Created By: {task.createdBy}
        </Typography>
      </div>
    );
  };

  return (
    <div  >
      <h2 >Tasks</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}   ref={dropTodo}>
          <Card>
            <CardContent style={{backgroundColor: '#abf460'}}>
            {/* <CardContent  style={{ maxHeight: '300px', overflowY: 'auto' }}> */}
              <Typography variant="h6" component="div" color="primary" >
                Todo
              </Typography>
              </CardContent>
              </Card>
              <Card>
              <CardContent style={{ maxHeight: '400px', overflowY: 'auto' }} >
              {tasks
                .filter(task => task.status === 'todo')
                .map(task => (
                  <Task key={task._id} task={task} />
                ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}  ref={dropInProgress}>
          <Card>
          <CardContent style={{backgroundColor: '#abf460'}}>
              <Typography variant="h6" component="div" color="primary">
                In Progress
              </Typography>
              </CardContent>
              </Card> 
              <Card>
              <CardContent style={{ maxHeight: '400px', overflowY: 'auto' }} >
              {tasks
                .filter(task => task.status === 'inprogress')
                .map(task => (
                  <Task key={task._id} task={task} />
                ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3} ref={dropReview}>
          <Card>
          <CardContent style={{backgroundColor: '#abf460'}}>
              <Typography variant="h6" component="div" color="primary">
                Review
              </Typography>
              </CardContent>
              </Card>
              <Card>
              <CardContent style={{ maxHeight: '400px', overflowY: 'auto' }} >
              {tasks
                .filter(task => task.status === 'review')
                .map(task => (
                  <Task key={task._id} task={task} />
                ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}  ref={dropCompleted}>
          <Card>
          <CardContent style={{backgroundColor: '#abf460'}}>
              <Typography variant="h6" component="div" color="primary">
                Completed
              </Typography>
                  </CardContent> 
                  </Card>
                  <Card> 
                  <CardContent style={{ maxHeight: '400px', overflowY: 'auto' }} >
              {tasks
                .filter(task => task.status === 'completed')
                .map(task => (
                  <Task key={task._id} task={task} />
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Link to={`/createTask/${projectId}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Create Task
        </Button>
      </Link>
      {selectedTask && (
        <TaskDetailsDialog open={dialogOpen} onClose={handleCloseDialog} task={selectedTask} />
      )}
    </div>
  );
}



export default ViewTasks;


// function ViewTasks() {
//   const { projectId } = useParams();
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/projects/${projectId}/tasks`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setTasks(response.data.tasks);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [projectId]);

// console.log("here",projectId);
//   const moveTask = async (taskId, newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:3001/projects/tasks/${taskId}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
//       console.log(`Task moved successfully to ${newStatus}`);
//       fetchTasks(); // Refresh tasks after moving
//     } catch (error) {
//       console.error('Error moving task:', error);
//       if (error.response && error.response.status === 403) {
//         // Alert user when unauthorized to update task status
//         alert('You are not authorized to update the task status.');
//       }
//     }
//   };

//   const handleDrop = (status) => (item) => {
//     moveTask(item.taskId, status);
//   };

//   const [, dropTodo] = useDrop({
//     accept: ItemTypes.TASK,
//     drop: handleDrop('todo')
//   });

//   const [, dropInProgress] = useDrop({
//     accept: ItemTypes.TASK,
//     drop: handleDrop('inprogress')
//   });

//   const [, dropReview] = useDrop({
//     accept: ItemTypes.TASK,
//     drop: handleDrop('review')
//   });

//   const [, dropCompleted] = useDrop({
//     accept: ItemTypes.TASK,
//     drop: handleDrop('completed')
//   });

//   // Define draggable task component
//   const Task = ({ task }) => {
//     const [{ isDragging }, drag] = useDrag({
//       type: ItemTypes.TASK,
//       item: { taskId: task._id },
//       collect: (monitor) => ({
//         isDragging: !!monitor.isDragging()
//       })
//     });

//     return (
//       <div
//         ref={drag}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//       >
//         <Typography variant="subtitle1" component="div" color="primary">
//           <strong>{task.title}</strong>
//         </Typography>
//         <Typography variant="body2" component="div" color="secondary">
//           {task.description}
//         </Typography>
//         <Typography variant="body2" component="div" color="secondary">
//           Created By: {task.createdBy}
//         </Typography>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <h2>Tasks</h2>
//       <Grid container spacing={3}>
//         {/* Todo Card */}
//         <Grid item xs={12} md={6} lg={3} ref={dropTodo}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div" color="primary">
//                 Todo
//               </Typography>
//               {tasks
//                 .filter(task => task.status === 'todo')
//                 .map(task => (
//                   <Task key={task._id} task={task} />
//                 ))}
//             </CardContent>
//           </Card>
//         </Grid>
//         {/* In Progress Card */}
//         <Grid item xs={12} md={6} lg={3} ref={dropInProgress}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div" color="primary">
//                 In Progress
//               </Typography>
//               {tasks
//                 .filter(task => task.status === 'inprogress')
//                 .map(task => (
//                   <Task key={task._id} task={task} />
//                 ))}
//             </CardContent>
//           </Card>
//         </Grid>
//         {/* Review Card */}
//         <Grid item xs={12} md={6} lg={3} ref={dropReview}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div" color="primary">
//                 Review
//               </Typography>
//               {tasks
//                 .filter(task => task.status === 'review')
//                 .map(task => (
//                   <Task key={task._id} task={task} />
//                 ))}
//             </CardContent>
//           </Card>
//         </Grid>
//         {/* Completed Card */}
//         <Grid item xs={12} md={6} lg={3} ref={dropCompleted}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div" color="primary">
//                 Completed
//               </Typography>
//               {tasks
//                 .filter(task => task.status === 'completed')
//                 .map(task => (
//                   <Task key={task._id} task={task} />
//                 ))}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       {/* <createTask projectId={projectId} fetchTasks={fetchTasks} /> */}
//       <Link to={`/createTask/${projectId}`} style={{ textDecoration: 'none' }}>
//         <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
//           Create Task
//         </Button>
//       </Link>
    
//     </div>
//   );
// }

// export default ViewTasks;





// return (
//     <div>
//       <h2>Tasks</h2>
//       <Grid container spacing={3}>
//         {/* Card for 'Todo' tasks */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div">
//                 Todo
//               </Typography>
//               <ul>
//                 {todoTasks.map(task => (
//                   <li key={task._id}>
//                     <strong>{task.title}</strong>: {task.description}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Card for 'In Progress' tasks */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div">
//                 In Progress
//               </Typography>
//               <ul>
//                 {inProgressTasks.map(task => (
//                   <li key={task._id}>
//                     <strong>{task.title}</strong>: {task.description}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Card for 'Review' tasks */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div">
//                 Review
//               </Typography>
//               <ul>
//                 {reviewTasks.map(task => (
//                   <li key={task._id}>
//                     <strong>{task.title}</strong>: {task.description}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Card for 'Completed' tasks */}
//         <Grid item xs={12} md={6} lg={3}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" component="div">
//                 Completed
//               </Typography>
//               <ul>
//                 {completedTasks.map(task => (
//                   <li key={task._id}>
//                     <strong>{task.title}</strong>: {task.description}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }


//   return (
//     <div>
//       <h2>Tasks</h2>
      
//       {/* Render tasks for 'Todo' */}
//       <div>
//         <h3>Todo</h3>
//         <ul>
//           {todoTasks.map(task => (
//             <li key={task._id}>
//               <strong>{task.title}</strong>: {task.description}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Render tasks for 'In Progress' */}
//       <div>
//         <h3>In Progress</h3>
//         <ul>
//           {inProgressTasks.map(task => (
//             <li key={task._id}>
//               <strong>{task.title}</strong>: {task.description}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Render tasks for 'Review' */}
//       <div>
//         <h3>Review</h3>
//         <ul>
//           {reviewTasks.map(task => (
//             <li key={task._id}>
//               <strong>{task.title}</strong>: {task.description}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Render tasks for 'Completed' */}
//       <div>
//         <h3>Completed</h3>
//         <ul>
//           {completedTasks.map(task => (
//             <li key={task._id}>
//               <strong>{task.title}</strong>: {task.description}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }