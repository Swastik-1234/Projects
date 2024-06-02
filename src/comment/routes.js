const express = require('express');
const commentRouter = express.Router();

const {
    deleteCommentByCommentOwner,
    deleteCommentByQuestionOwner,
    getAllComments,
    getAnswerComments,
    getMyComments,
    getUserComments,
    insertComment,
    updateComment
} = require('./controllers')

const { verifyToken } = require('../middlewares/authMiddleware');
const { validateComment } = require('../middlewares/validationMiddleware')

commentRouter.get('/all', getAllComments);
commentRouter.get('/:uid', getUserComments);
commentRouter.get('/ans-comment/:aid', getAnswerComments);
commentRouter.get('/', verifyToken, getMyComments);
commentRouter.post('/', verifyToken, validateComment, insertComment);
commentRouter.patch('/:cid', verifyToken, updateComment);
commentRouter.delete('/comm-owner/:cid', verifyToken, deleteCommentByCommentOwner);
commentRouter.delete('/ques-owner/:cid/:aid', verifyToken, deleteCommentByQuestionOwner);

module.exports = { commentRouter };