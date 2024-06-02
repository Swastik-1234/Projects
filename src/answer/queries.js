const _getAnswerUid = () => `
    SELECT 
        uid
    FROM
        answers
    WHERE
        aid = ?
`

const _deleteAnswerByAnswerOwner = () => `
    DELETE FROM
        answers
    WHERE
        aid = ? and uid = ?
`

const _getQuestionUid = () => `
    SELECT 
        q.uid
    FROM
        answers a
            JOIN
        questions q ON a.qid = q.qid
    WHERE
        a.qid = ?
    GROUP BY (q.uid);
`

const _deleteAnswerByQuestionOwner = () => `
    DELETE FROM
        answers
    WHERE
        aid = ?
`

const _getQuestionUidForInsert = () => `
    SELECT 
        uid
    FROM
        questions
    WHERE qid = ?
`

const _insertAnswer = () => `
    INSERT INTO
        answers 
    VALUES (?, ?, ?, ?, now(), now())
`

const _getAllAnswers = () => `
    SELECT 
        aid as answerId,
        atext as answerText,
        qid as questionId,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        answers;
`

const _getAnswersByUserId = () => `
    SELECT 
        aid as answerId,
        atext as answerText,
        qid as questionId,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        answers
    WHERE
        uid = ?
`

const _getAnswersForAQuestion = () => `
    SELECT 
        aid as answerId,
        atext as answerText,
        qid as questionId,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        answers
    WHERE
        qid = ?
`

const _updateAnswer = () => `
    UPDATE 
        answers
    SET 
        atext = ?, updatedAt = now()
    WHERE
        aid = ? and uid = ?
`

module.exports = {
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
}