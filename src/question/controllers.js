const asyncHandler = require('express-async-handler')
const { execute } = require('./../utils/dbConnect');
const { sendResponse } = require('./../utils/sendResponse');
const  { CustomError } = require('./../middlewares/errorMiddleware')

const {
    _deleteQuestion,
    _getAllQuestions,
    _getQuestionsByUserId,
    _insertQuestion,
    _updateQuestion,
    _getAnswersForAQuestion,
    _getSearchedQuestionData
} = require('./queries')

const getAllQuestions = asyncHandler(async (req, res) => {

    const questionData = await execute(_getAllQuestions());

    return sendResponse(
        res,
        questionData instanceof Error ? questionData : { message: 'Question data fetched.', questionData },
        200
    )

})

const getUserQuestions = asyncHandler(async (req, res) => {
    const uid = req.params.uid;

    const queryData = [uid];

    const questionData = await execute(_getQuestionsByUserId(), queryData);

    return sendResponse(
        res,
        questionData instanceof Error ? questionData : { message: 'Question data fetched.', questionData },
        200
    )
})

const getMyQuestions = asyncHandler(async (req, res) => {
    const { uid } = req.user;

    const queryData = [uid];

    const questionData = await execute(_getQuestionsByUserId(), queryData);

    return sendResponse(
        res,
        questionData instanceof Error ? questionData : { message: 'Question data fetched.', questionData },
        200
    )
})

const insertQuestion = asyncHandler(async (req, res) => {
    const { qid, qtitle, qdescription } = req.validatedQuestionData;
    
    const { uid } = req.user;

    const queryData = [qid, qtitle, qdescription, uid]

    const postedQuestionDetails = await execute(_insertQuestion(), queryData);

    return sendResponse(
        res,
        postedQuestionDetails instanceof Error ? postedQuestionDetails : {message: 'Question succesfully posted.', questionData: {...req.body, uid}},
        200
    )
})

const updateQuestion = asyncHandler(async (req, res) => {
    const { qtitle, qdescription } = req.body;

    if(!qtitle || !qdescription) {
        throw new CustomError('Fill all fields properly.', 400)
    }

    const { uid } = req.user;
    const { qid } = req.params;

    const queryData = [qtitle, qdescription, qid, uid]

    const updatedQuestionDetails = await execute(_updateQuestion(), queryData);

    if(!(updatedQuestionDetails.affectedRows)) {
        res.status(401);
        throw new Error("Not authorized or invalid question ID");
    }

    return sendResponse(
        res,
        updatedQuestionDetails instanceof Error
         ? 
         updatedQuestionDetails : { message: 'Question succesfully updated.', updatedQuestionData: {qid, ...req.body, uid} },
        200
    )
})

const deleteQuestion = asyncHandler(async (req, res) => {
    const { qid } = req.params;
    const { uid } = req.user;
    const queryData = [qid, uid];
    const deletedQuestionDetails = await execute(_deleteQuestion(), queryData);

    if(!(deletedQuestionDetails.affectedRows)) {
        throw new CustomError("Invalid credentials", 401);
    }

    return sendResponse(
        res,
        deletedQuestionDetails instanceof Error ? deletedQuestionDetails : { message: 'Question deleted successfully.', deletedQuestionDetails },
        200
    )
});

const searchQuestions = asyncHandler( async (req, res) => {
    const { searchText } = req.body;

    if(!searchText) {
        throw new CustomError('No seach text enetered', 400);
    }

    const searchedQuestions = await execute(_getSearchedQuestionData(searchText));
    let answersForSearchedQuestions = []


    for(let i=0; i<searchedQuestions.length; i++) {
        // console.log(searchedQuestionData[0][i].qid);
        // const query = `select * from answers a join questions q on a.qid = q.qid where qid = '${searchedQuestionData[0][i].qid}'`;
        const getAnswersForAQuestionQueryData = [searchedQuestions[i].questionId];
        let answerForAQuestion = await execute(_getAnswersForAQuestion(), getAnswersForAQuestionQueryData);
        answersForSearchedQuestions.push(answerForAQuestion);
    }

    for(let i=0; i<searchedQuestions.length; i++) {
        searchedQuestions[i] = { ...searchedQuestions[i], answers: answersForSearchedQuestions[i] };
    }

    return sendResponse(
        res,
        searchedQuestions instanceof Error ? searchedQuestions : { message: 'Search results fetched.', searchedQuestions },
        200
    )
});

module.exports = {
    getAllQuestions,
    getUserQuestions,
    getMyQuestions,
    insertQuestion,
    updateQuestion,
    deleteQuestion,
    searchQuestions
}