const _deleteQuestion = () => `
    DELETE FROM
        questions
    WHERE
        qid = ? and uid = ?
`

const _insertQuestion = () => `
    INSERT INTO
        questions
    VALUES
        (?, ?, ?, ?, now(), now())
`


const _getAllQuestions = () => `
    SELECT 
        qid as questionId,
        qtitle as questionTitle,
        qdescription as questionDescription,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        questions;
`

const _getQuestionsByUserId = () => `
    SELECT 
        qid as questionId,
        qtitle as questionTitle,
        qdescription as questionDescription,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        questions
    WHERE 
        uid = ?
`

const _updateQuestion = () => `
    UPDATE questions 
    SET 
        qtitle = ?,
        qdescription = ?,
        updatedAt = NOW()
    WHERE
        qid = ? AND uid = ?
`

const _getSearchedQuestionData = (searchText) => `
    SELECT 
        qid as questionId,
        qtitle as questionTitle, 
        qdescription as questionDescription, 
        uid as userId
    FROM
        questions
    WHERE
        qtitle LIKE '%${searchText}%'
`

const _getAnswersForAQuestion = () => `
    SELECT
        aid as answerId,
        atext as answerText,
        uid as userId
    FROM
        answers
    WHERE
        qid = ?
`

module.exports = {
    _deleteQuestion,
    _insertQuestion,
    _getAllQuestions,
    _getQuestionsByUserId,
    _updateQuestion,
    _getSearchedQuestionData,
    _getAnswersForAQuestion
}