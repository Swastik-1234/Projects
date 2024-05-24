const mongoose = require('mongoose');
const taskSchema=require('./task').schema

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   //tasks: [taskSchema], // Embedding tasks within the project schema
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now },
    collaborators: [{ type: String }]
  });

  const Project=mongoose.model('Project',projectSchema)
module.exports = Project;
