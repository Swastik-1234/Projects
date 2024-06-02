
const _getUserData = () => `
    SELECT 
        uemail as userEmail,
        uname as userName
    FROM
        users
    WHERE
        uid = ?;
`

const _insertUser = () => `
    INSERT INTO users (uid, uemail, uname)
    VALUES (?)
`

const _getUserActiveStatus = () => `
    SELECT 
        isActive
    FROM
        users
    WHERE
        uid = ?
`

const _setUserAsNotActive = () => `
    UPDATE
        users
    SET
        isActive = 0
    WHERE uid = ?
`

const _getUserUid = () => `
    SELECT 
        uid, isActive
    FROM
        users
    WHERE
        uid = ? and uemail = ?
`

module.exports = {
    _getUserData,
    _insertUser,
    _getUserActiveStatus,
    _setUserAsNotActive,
    _getUserUid
}