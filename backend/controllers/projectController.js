const Project = require('../schemas/project');
const Task = require('../schemas/task');
const bcrypt = require('bcryptjs');
const User=require('../schemas/user');
const redisClient = require('../redis');
const redis = require('ioredis');
const redisClients = new redis();

const {getAsync,setAsync,lrangeAsync,rpushAsync,lpushAsync,lsetAsync}=require('../redis')
const {sendEmail}=require('./mailController')


exports.viewContributors= async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    // Find the task by taskId and populate the contributors field with user's email and role
    const task = await Task.findById(taskId)
      .populate({
        path: 'contributors.user',
        select: 'email',
      })
      .select('contributors');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ contributors: task.contributors });
  } catch (error) {
    console.error('Error fetching contributors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin users can create projects' });
    }
    const createdBy = req.user._id;

    // Check if projects data is present in cache
    const cachedProjects = await getAsync('projects');

    if (cachedProjects) {
      const projects = JSON.parse(cachedProjects);
      const project = new Project({ title, description, createdBy });
      await project.save();
      projects.push(project);
      // Update cache with the new project added
      await setAsync('projects', JSON.stringify(projects));
      res.status(201).json({ message: 'Project created successfully', project });
    } else {
      // If data is not in cache, fetch it from the database
      const project = new Project({ title, description, createdBy });
      await project.save();
      // Cache the fetched data
      const projects = await Project.find().populate('tasks');
      await setAsync('projects', JSON.stringify({ projects }));

      
      console.log("Project added to cache:", project);
      res.status(201).json({ message: 'Project created successfully', project });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.createTask = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const createdBy = req.user._id;
//     const { projectId } = req.params;
//     const createsBy = req.user.email;
//     //console.log(createsBy);
//     const project = await Project.findById(projectId);
//     const collaborators = project.collaborators || [];
//     console.log(collaborators);
//     if (!collaborators.includes(createsBy)) {
//       return res.status(403).json({ message: 'You are not authorized to create tasks for this project' });
//     }
//     const task = new Task({ title, description, createdBy, project: projectId });
//     await task.save();
//     res.status(201).json({ message: 'Task created successfully', task });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user._id;
    const { projectId } = req.params;
    const createsBy = req.user.email;

    const project = await Project.findById(projectId);
    const collaborators = project.collaborators || [];

    if (!collaborators.includes(createsBy)) {
      return res.status(403).json({ message: 'You are not authorized to create tasks for this project' });
    }

    const task = new Task({ title, description, createdBy, project: projectId });
    await task.save();

    // Push the task data to a Redis list
    await redisClients.lpush(`tasks_queue:${projectId}`, JSON.stringify(task));

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.updateTaskStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const { taskId } = req.params;
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     const isContributor = task.contributors.some(contributor => contributor.user.equals(req.user._id));
//     if (!isContributor) {
//       return res.status(403).json({ message: 'You are not authorized to update task status for this project' });
//     }

//     task.status = status;
//     await task.save();
//     //await setAsync(`task:${taskId}`, JSON.stringify(task));
//     res.json({ message: 'Task status updated successfully', task });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const isContributor = task.contributors.some(contributor => contributor.user.equals(req.user._id));
    
    if (!isContributor) {
      return res.status(403).json({ message: 'You are not authorized to update task status for this project' });
    }

    // Update task status in the database
    task.status = status;
    await task.save();

    // Update task status in Redis if it exists in cache
    const projectTasksKey = `tasksss:${task.project}`;
    const cachedTasks = await lrangeAsync(projectTasksKey, 0, -1);

    if (cachedTasks && cachedTasks.length > 0) {
      const index = cachedTasks.findIndex(t => JSON.parse(t)._id === taskId);
      
      if (index !== -1) {
        const updatedTask = { ...JSON.parse(cachedTasks[index]), status };
        await lsetAsync(projectTasksKey, index, JSON.stringify(updatedTask));
      }
      console.log("from cache");
    }

    res.json({ message: 'Task status updated successfully', task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.getTaskById = async (req, res) => {
//   try {
//       const { projectId, taskId } = req.params;

//       // Find the project by its ID
//       const project = await Project.findById(projectId);

//       if (!project) {
//           return res.status(404).json({ message: 'Project not found' });
//       }

//       // Find the task by its ID within the project
//       const task = await Task.findOne({ _id: taskId, project: projectId });

//       if (!task) {
//           return res.status(404).json({ message: 'Task not found in the project' });
//       }

//       res.status(200).json(task);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };
exports.getTaskById = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    // Fetch the tasks list for the specified project ID from Redis
    const cachedTasks = await lrangeAsync(`tasks:${projectId}`, 0, -1);

    if (cachedTasks && cachedTasks.length > 0) {
      // If cached tasks exist, find the task by its ID within the cached tasks
      const task = cachedTasks.find(task => JSON.parse(task)._id === taskId);

      if (task) {
        // If the task is found in the cached tasks, return it
        console.log('Fetching task from cache');
        res.status(200).json(JSON.parse(task));
        return;
      }
    }

    // If the task is not found in the cached tasks, fetch it from the database
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found in the project' });
    }

    // Cache the task details in Redis list
    await rpushAsync(`tasks:${projectId}`, JSON.stringify(task));

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getTasks = async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     // Fetch tasks for the specified project ID
//     const tasks = await Task.find({ project: projectId });

//     // Return the tasks in the response
//     res.status(200).json({ tasks });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch tasks from the database
    const tasks = await Task.find({ project: projectId });

    // Return the tasks in the response
    res.status(200).json({ tasks });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};


// exports.getTasks = async (req, res) => {
//   try {
//     const { projectId } = req.params;

//     // Check if tasks are available in the Redis cache
//     const cachedTasks = await redisClient.lrangeAsync(`tasks_queue:${projectId}`, 0, -1);
// console.log(cachedTasks);
//     if (cachedTasks && cachedTasks.length > 0) {
//       // Tasks found in cache, return them
//       const tasks = cachedTasks.map(task => JSON.parse(task));
//       return res.status(200).json({ tasks });
//     }

//     // Tasks not found in cache, fetch them from the database
//     const tasks = await Task.find({ project: projectId });

//     // Store fetched tasks in Redis cache
//     tasks.forEach(async task => {
//       await redisClient.lpushAsync(`tasks_queue:${projectId}`, JSON.stringify(task));
//     });

//     // Return the tasks in the response
//     res.status(200).json({ tasks });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: error.message });
//   }
// };


exports.getProjects = async (req, res) => {
  try {
    // Check if data exists in cache
    const cachedData = await getAsync('projects');

    if (cachedData) {
      // If cached data exists, return it
      console.log('Fetching projects from cache');
      res.json(JSON.parse(cachedData));
    } else {
      // If data is not in cache, fetch it from the database
      const projects = await Project.find().populate('tasks');

      // Cache the fetched data
      await setAsync('projects', JSON.stringify(projects));

      // Return the fetched data in the response
      console.log('Fetching projects from database');
      res.json(projects);
    }
    
  } catch (error) {
    console.error('Error in getProjects:', error);
    res.status(500).json({ error: error.message });
  }
};


function generateTemporaryPassword() {
    const length = 10;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let temporaryPassword = '';
    for (let i = 0; i < length; i++) {
      temporaryPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return temporaryPassword;
  }

  // exports.createTask = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const createdBy = req.user._id;
//     const { projectId } = req.params;
//     const createsBy = req.user.email;

//     const project = await Project.findById(projectId);
//     const collaborators = project.collaborators || [];
//     if (!collaborators.includes(createsBy)) {
//       return res.status(403).json({ message: 'You are not authorized to create tasks for this project' });
//     }

//     // Check if projects data is present in cache
//     const cachedProjects = await getAsync('projects');

//     if (cachedProjects) {
//       const projects = JSON.parse(cachedProjects);
//       const task = new Task({ title, description, createdBy, project: projectId });
//       await task.save();
//       // Update cache with the new task added
//       const updatedProjects = projects.map(p => {
//         if (p._id.toString() === projectId) {
//           p.tasks.push(task);
//         }
//         return p;
//       });
//       await setAsync('projects', JSON.stringify(updatedProjects));
//       res.status(201).json({ message: 'Task created successfully', task });
//     } else {
//       // If data is not in cache, fetch it from the database
//       const task = new Task({ title, description, createdBy, project: projectId });
//       await task.save();
//       // Cache the fetched data
//       const projects = await Project.find().populate('tasks');
//       await setAsync('projects', JSON.stringify({ projects }));
//       res.status(201).json({ message: 'Task created successfully', task });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.addCollaborator = async (req, res) => {
//   try {
//       const { projectId } = req.params;
//       const { email } = req.body;

//       // Find the project by ID
//       const project = await Project.findById(projectId);

//       if (!project) {
//           return res.status(404).json({ message: 'Project not found' });
//       }

//       let user = await User.findOne({ email });
//       console.log(user);
//       if (!user) {
//         // Generate a temporary password for the new user
//         const tempPassword = generateTemporaryPassword();
  
//         // Send email to the user with the temporary password
//         await sendEmail(email, tempPassword);
  
//         // Hash the temporary password
//         const hashedPassword = await bcrypt.hash(tempPassword, 10);
  
//         // Create a new user in the database
//         user = new User({ email, password: hashedPassword });
//         await user.save();
//         console.log(user);
//       }
// console.log("heree");
//       // Add the collaborator's email to the collaborators array
//       project.collaborators.push(email);
//       await project.save();

//       res.status(200).json({ message: 'Collaborator added successfully', project });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };



// exports.getProjects = async (req, res) => {
//   try {
//     // Find all projects and populate the tasks array
//     const projects = await Project.find().populate('tasks');
//     console.log(projects.tasks)
//     res.status(200).json({ projects });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.getProjects = async (req, res) => {
//   try {
//     // Retrieve projects
//     const projects = await Project.find();

//     // Populate tasks array of each project
//     await Project.populate(projects, { path: 'tasks' });

//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// controllers/projectController.js