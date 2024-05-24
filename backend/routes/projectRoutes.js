const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../controllers/verify');
const mailController=require('../controllers/mailController')
const Project=require('../schemas/project')
router.post('/', authMiddleware.verifyToken, projectController.createProject);
router.post('/:projectId/tasks', authMiddleware.verifyToken, projectController.createTask);
router.put('/tasks/:taskId', authMiddleware.verifyToken, projectController.updateTaskStatus);
router.get('/', authMiddleware.verifyToken, projectController.getProjects);
router.get('/:projectId/tasks/:taskId', authMiddleware.verifyToken,projectController.getTaskById);
router.put('/:projectId/addCollaborator',authMiddleware.verifyToken,mailController.checkProjectOwner,mailController.addCollaborator);
router.get('/:projectId/tasks', authMiddleware.verifyToken,projectController.getTasks);
router.get('/:projectId/tasks/:taskId/contributors',authMiddleware.verifyToken, projectController.viewContributors);
const {setAsync,getAsync}=require('../redis')


module.exports = router;
