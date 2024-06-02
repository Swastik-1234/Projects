const express = require('express');
const answerRouter = express.Router();

const {
    getAllAnswers,
    getUserAnswers,
    getMyAnswers,
    getQuestionAnswers,
    insertAnswer,
    updateAnswer,
    deleteAnswerByAnswerOwner,
    deleteAnswerByQuestionOwner
} = require('./controllers')

const { verifyToken } = require('../middlewares/authMiddleware');
const { validateAnswer } = require('../middlewares/validationMiddleware')

answerRouter.get('/all', getAllAnswers);
answerRouter.get('/:uid', getUserAnswers);
answerRouter.get('/ques-ans/:qid', getQuestionAnswers);
answerRouter.get('/', verifyToken, getMyAnswers);
answerRouter.post('/', verifyToken, validateAnswer, insertAnswer);
answerRouter.patch('/:aid', verifyToken, updateAnswer);
answerRouter.delete('/ans-owner/:aid', verifyToken, deleteAnswerByAnswerOwner);
answerRouter.delete('/ques-owner/:aid/:qid', verifyToken, deleteAnswerByQuestionOwner);

module.exports = { answerRouter };