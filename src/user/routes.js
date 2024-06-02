const express = require('express');
const userRouter = express.Router();

const {
    getUser,
    deleteUser,
    loginUser,
    registerUser
} = require('./controllers')

const { verifyToken } = require('../middlewares/authMiddleware');
const { validateUser } = require('../middlewares/validationMiddleware')

userRouter.get('/', verifyToken, getUser); 
userRouter.post('/register', validateUser, registerUser);
userRouter.post('/login', loginUser);
userRouter.delete('/', verifyToken, deleteUser);

module.exports = { userRouter };

