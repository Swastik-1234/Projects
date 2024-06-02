const express = require('express');
const questionRouter = express.Router();

const {
    deleteQuestion,
    getAllQuestions,
    getMyQuestions,
    getUserQuestions,
    insertQuestion,
    updateQuestion,
    searchQuestions
} = require('./controllers')

const { verifyToken } = require('../middlewares/authMiddleware');
const { validateQuestion } = require('../middlewares/validationMiddleware')

questionRouter.get('/all', getAllQuestions);
questionRouter.get('/', verifyToken, getMyQuestions);
questionRouter.get('/search', searchQuestions);
questionRouter.get('/:uid', getUserQuestions);
questionRouter.post('/', verifyToken, validateQuestion, insertQuestion);
questionRouter.patch('/:qid', verifyToken, updateQuestion);
questionRouter.delete('/:qid', verifyToken, deleteQuestion);

module.exports = {  questionRouter };
