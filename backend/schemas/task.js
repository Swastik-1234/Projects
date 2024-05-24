const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'inprogress', 'review', 'completed'], default: 'todo' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  contributors: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['developer', 'tester'], default: 'developer' }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

taskSchema.pre('save', async function(next) {
  try {
    // If contributors array is empty, populate it with default role and referenced user
    if (this.contributors.length === 0) {
      const defaultRole = 'developer'; // Default role
      const user = this.createdBy; // User who created the task
      this.contributors.push({ user, role: defaultRole });
    }
    next();
  } catch (error) {
    next(error);
  }
});
taskSchema.pre('save', async function(next) {
  try {
    const project = await mongoose.model('Project').findById(this.project);
    if (project) {
      // Check if the task ID already exists in the project's tasks array
      const taskExists = project.tasks.includes(this._id);
      if (!taskExists) {
        // If not, push the task ID to the project's tasks array
        project.tasks.push(this._id);
        await project.save();
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Task= mongoose.model('Task', taskSchema);
module.exports =Task;
