const asyncHandler = require('express-async-handler')
const { execute } = require('./../utils/dbConnect');
const { sendResponse } = require('./../utils/sendResponse');
const  { CustomError } = require('./../middlewares/errorMiddleware')

const {
    _getCommentUid,
    _deleteCommentByCommentOwner,
    _getCommentQid,
    _deleteCommentByQuestionOwner,
    _getAllComments,
    _getCommentsByUserId,
    _insertComment,
    _getCommentsForAnAnswer,
} = require('./queries')

const deleteCommentByCommentOwner = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const { uid } = req.user;
    const getCommentUidQueryData = [cid];
    const commentUid = await execute(_getCommentUid(), getCommentUidQueryData);

    if(commentUid instanceof Error) {
        throw new CustomError(resultArr1, 400);
    }

    const commentOwnerId = commentUid[0].uid;
    if(commentOwnerId !== uid) {
        throw new CustomError("Not authorized to delete.", 400)
    }

    const deleteCommentByCommentOwnerQueryData = [cid, uid];
    const deletedCommentDetails = await execute(_deleteCommentByCommentOwner(), deleteCommentByCommentOwnerQueryData);

    return sendResponse(
        res,
        deletedCommentDetails instanceof Error ? deletedCommentDetails : {message: 'Comment succesfully deleted.', commentData: deletedCommentDetails},
        200
    )
});

const deleteCommentByQuestionOwner = asyncHandler(async (req, res) => {
    const { cid, aid } = req.params;
    const { uid } = req.user;
    const getCommentQidQueryData = [cid]
    const commentQid = await execute(_getCommentQid(), getCommentQidQueryData);

    // return console.log(commentQid);
    if(commentQid instanceof Error) {
        throw new CustomError(commentQid, 400);
    }

    const quesOwnerId = commentQid[0].uid;
    if(quesOwnerId !== uid) {
        throw new CustomError("Not authorized to delete.", 400)
    }

    const deleteCommentByQuestionOwnerQueryData = [cid];
    const deletedCommentDetails = await execute(_deleteCommentByQuestionOwner(), deleteCommentByQuestionOwnerQueryData);

    return sendResponse(
        res,
        deletedCommentDetails instanceof Error ? deletedCommentDetails : {message: 'Comment succesfully deleted.', commentData: deletedCommentDetails},
        200
    )
});

const insertComment = asyncHandler(async (req, res) => {
    const { cid, ctext, aid } = req.validatedCommentData;

    if(!cid || !ctext || !aid) {
        throw new CustomError('Fill all fields properly.', 400)
    }
    const { uid } = req.user;

    const queryData = [cid, ctext, aid, uid];
    const insertedCommentDetails = await execute(_insertComment(), queryData);

    return sendResponse(
        res,

        insertedCommentDetails instanceof Error ? 
        insertedCommentDetails : 
        {message: 'Comment succesfully posted.', commentData: { ...req.body, uid }},

        200
    )
})

const getAllComments = asyncHandler(async (req, res) => {

    const allCommentsData = await execute(_getAllComments());

    return sendResponse(
        res,
        allCommentsData instanceof Error ? allCommentsData : {message: 'Comments data fetched.', commentData: allCommentsData},
        200
    )

})

const getUserComments = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const queryData = [uid];
    const userCommentsData = await execute(_getCommentsByUserId(), queryData);

    return sendResponse(
        res,
        userCommentsData instanceof Error ? userCommentsData : {message: 'Comments data fetched.', commentData: userCommentsData},
        200
    )
})

const getMyComments = asyncHandler(async (req, res) => {
    const { uid } = req.user;
    const queryData = [uid];
    const loggedInUserCommentsData = await execute(_getCommentsByUserId(), queryData);

    return sendResponse(
        res,
        loggedInUserCommentsData instanceof Error ? loggedInUserCommentsData : {message: 'Comments data fetched.', commentData: loggedInUserCommentsData},
        200
    )
})

const getAnswerComments = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const queryData = [aid];
    const commentsForAnAnswerData = await execute(_getCommentsForAnAnswer(), queryData);

    return sendResponse(
        res,
        commentsForAnAnswerData instanceof Error ? commentsForAnAnswerData : {message: 'Comments data fetched.', commentData: commentsForAnAnswerData},
        200
    )
})

const updateComment = asyncHandler(async (req, res) => {
    const { ctext } = req.body;

    if(!ctext) {
        throw new CustomError('Fill all fields properly.', 400)
    }

    const { uid } = req.user;
    const { cid } = req.params;

    const queryData = [ctext, cid, uid];
    const updatedCommentData = await execute(_updateComment(), queryData);

    if(!(resultArr[0].affectedRows)) {
        res.status(401);
        throw new Error("Not authroized or invalid question ID");
    }

    return sendResponse(
        res,
        updatedCommentData instanceof Error ? updatedCommentData : {message: 'Comment successfully updated.', commentData: updatedCommentData},
        200
    )
})

module.exports = {
    deleteCommentByCommentOwner,
    deleteCommentByQuestionOwner,
    getAllComments,
    getUserComments,
    getMyComments,
    getAnswerComments,
    updateComment,
    insertComment
}