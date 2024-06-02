
const _getCommentUid = () => `
    SELECT
        uid
    FROM
        comments
    WHERE
        cid = ?
`

const _deleteCommentByCommentOwner = () => `
    DELETE FROM
        comments
    WHERE
        cid = ? and uid = ?
`

const _getCommentQid = () => `
    SELECT 
        q.uid
    FROM
        comments c
            JOIN
        answers a
            JOIN
        questions q ON c.aid = a.aid AND a.qid = q.qid
    WHERE
        c.cid = ?
    GROUP BY 
        (q.uid);
`

const _deleteCommentByQuestionOwner = () => `
    DELETE FROM
        comments
    WHERE
        cid = ?
`
const _insertComment = () => `
    INSERT INTO
        comments
    VALUES (?, ?, ?, ?, now(), now())
`

const _getAllComments = () => `
    SELECT 
        cid as commentId,
        ctext as commentText,
        aid as answerId,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        comments
`

const _getCommentsByUserId = () => `
    SELECT 
        cid as commentId,
        ctext as commentText,
        aid as answerId,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        comments
    WHERE 
        uid = ?
`

const _getCommentsForAnAnswer = () => `
    SELECT 
        cid as commentId,
        ctext as commentText,
        aid as answerId,
        uid as userId,
        createdAt,
        updatedAt
    FROM
        comments
    WHERE 
        aid = ?
`

const _updateComment = () => `
    UPDATE
        comments
    SET 
        ctext = ?, 
        updatedAt = now()
    WHERE
        cid = ? and uid = ?
`

module.exports = {
    _getCommentUid,
    _deleteCommentByCommentOwner,
    _getCommentQid,
    _deleteCommentByQuestionOwner,
    _getAllComments,
    _getCommentsByUserId,
    _insertComment,
    _getCommentsForAnAnswer,
}