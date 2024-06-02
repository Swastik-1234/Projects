const asyncHandler = require('express-async-handler')
const { execute } = require('./../utils/dbConnect');
const { sendResponse } = require('./../utils/sendResponse');
const  { CustomError } = require('./../middlewares/errorMiddleware')

const {
    _deleteAnswerByAnswerOwner,
    _deleteAnswerByQuestionOwner,
    _insertAnswer,
    _updateAnswer,
    _getAllAnswers,
    _getAnswersByUserId,
    _getAnswersForAQuestion,
    _getQuestionUidForInsert,
    _getAnswerUid,
    _getQuestionUid
} = require('./queries')

const deleteAnswerByAnswerOwner = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const { uid } = req.user;
    const getAnswerUidQueryData = [aid];
    const answerUid = await execute(_getAnswerUid(), getAnswerUidQueryData);

    if(answerUid instanceof Error) {
        throw new CustomError(resultArr1, 400);
    }

    const ansOwnerId = answerUid[0].uid;
    if(ansOwnerId !== uid) {
        throw new CustomError("Not authorized to delete.", 400)
    }

    const deleteAnswerQueryData = [aid, uid];
    const deletedAnswerDetails = await execute(_deleteAnswerByAnswerOwner(), deleteAnswerQueryData);

    return sendResponse(
        res,
        deletedAnswerDetails instanceof Error ? deletedAnswerDetails : { message: 'Answer deleted successfully.', deletedAnswerDetails },
        200
    )
});

const deleteAnswerByQuestionOwner = asyncHandler(async (req, res) => {
    const { aid, qid } = req.params;
    const { uid } = req.user;
    const getQuestionUidQueryData = [qid]
    const questionUid = await execute(_getQuestionUid(), getQuestionUidQueryData);

    if(questionUid instanceof Error) {
        throw new CustomError(questionUid, 400);
    }

    const quesOwnerId = questionUid[0].uid;
    if(quesOwnerId !== uid) {
        throw new CustomError("Not authorized to delete.", 401)
    }

    const deleteAnswerQueryData = [aid];
    const deletedAnswerDetails = await execute(_deleteAnswerByQuestionOwner(),deleteAnswerQueryData);

    return sendResponse(
        res,
        deletedAnswerDetails instanceof Error ? deletedAnswerDetails : { message: 'Answer deleted successfully.', deletedAnswerDetails },
        200
    )
});

const insertAnswer = asyncHandler(async (req, res) => {
    const { aid, atext, qid } = req.validatedAnswerData;

    const { uid } = req.user;
    const getQuestionUidQueryData = [qid];
    const questionUid = await execute(_getQuestionUidForInsert(), getQuestionUidQueryData);
    
    if(questionUid instanceof Error) {
        throw new CustomError(questionUid, 400);
    }

    if(uid === questionUid[0].uid) {
        throw new CustomError("You can't answer your own question.", 400);
    }

    const insertAnswerQueryData = [aid, atext, qid, uid]
    const insertedAnswerDetails = await execute(_insertAnswer(), insertAnswerQueryData);

    return sendResponse(
        res,
        insertedAnswerDetails instanceof Error ? insertedAnswerDetails : { message: 'Answer succesfully inserted.', answerData: {...req.body, uid} },
        200
    )
})

const getAllAnswers = asyncHandler(async (req, res) => {

    const answerData = await execute(_getAllAnswers());

    return sendResponse(
        res,
        answerData instanceof Error ? answerData : { message: 'Answer data fetched.', answerData },
        200
    )

})

const getUserAnswers = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const queryData = [uid];

    const answerData = await execute(_getAnswersByUserId(), queryData);

    return sendResponse(
        res,
        answerData instanceof Error ? answerData : { message: 'Answer data fetched.', answerData },
        200
    )
})

const getMyAnswers = asyncHandler(async (req, res) => {
    const { uid } = req.user;

    const queryData = [uid];

    const answerData = await execute(_getAnswersByUserId(), queryData);

    return sendResponse(
        res,
        answerData instanceof Error ? answerData : { message: 'Answer data fetched.', answerData },
        200
    )
})

const getQuestionAnswers = asyncHandler(async (req, res) => {
    const { qid } = req.params;
    const queryData = [qid];
    const answerData = await execute(_getAnswersForAQuestion(), queryData);

    return sendResponse(
        res,
        answerData instanceof Error ? answerData : { message: 'Answer data fetched.', answerData },
        200
    )
})

const updateAnswer = asyncHandler(async (req, res) => {
    const { atext } = req.body;

    if(!atext) {
        throw new CustomError('Fill all fields properly.', 400)
    }

    const { uid } = req.user;
    const { aid } = req.params;

    const queryData = [atext, aid, uid]
    const updatedAnswerDetails = await execute(_updateAnswer(), queryData);

    if(!(updatedAnswerDetails.affectedRows)) {
        throw new CustomError("Not authorized or invalid question ID.", 401);
    }

    return sendResponse(
        res,
        updatedAnswerDetails instanceof Error
         ? 
         updatedAnswerDetails : { message: 'Answer succesfully updated.', updatedAnswerData: {aid, ...req.body, uid} },
        200
    )

})

module.exports = {
    getAllAnswers,
    getUserAnswers,
    getMyAnswers,
    getQuestionAnswers,
    insertAnswer,
    updateAnswer,
    deleteAnswerByAnswerOwner,
    deleteAnswerByQuestionOwner
}