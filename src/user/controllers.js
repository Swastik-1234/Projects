const asyncHandler = require('express-async-handler')

const { execute } = require('./../utils/dbConnect');
const { sendResponse } = require('./../utils/sendResponse');
const { CustomError } = require('./../middlewares/errorMiddleware')
const { generateToken } = require('../utils/generateToken');
 
const {
    _getUserActiveStatus,
    _getUserData,
    _getUserUid,
    _insertUser,
    _setUserAsNotActive
} = require('./queries');

const getUser = asyncHandler(async (req, res) => {
    const { uid } = req.user;

    const queryData = [uid];

    const userData = await execute(_getUserData(), queryData);

    return sendResponse(
        res,
        userData,
        200
    )

});

const registerUser = asyncHandler(async (req, res) => {
    const { uid, uemail, uname } = req.validatedUserData;

    const queryData = [uid, uemail, uname];

    const registeredUserDetails = await execute(_insertUser(), [queryData]);

    // if(resultArr instanceof Error) {

    //     const isActiveCheckQuery = `select isActive from users where uid = '${uid}'`;
    //     const isActiveCheckArr = await execute(isActiveCheckQuery);
        
    //     if(isActiveCheckArr instanceof Error) {
    //         res.status(400);
    //         throw new Error(isActiveCheckArr);
    //     }

    //     const checkErrorForDuplicateUid = resultArr.sqlMessage.split(' ')[5]
    //     console.log(checkErrorForDuplicateUid)
    //     console.log(resultArr.code)
    //     console.log(isActiveCheckArr[0][0].isActive)

    //     if(resultArr.code == "ER_DUP_ENTRY" && checkErrorForDuplicateUid == "'users.PRIMARY'" &&  !(isActiveCheckArr[0][0].isActive)) {


    //         // return console.log("hello");

    //         const query = `update users set isActive = 1, uname = '${uname}' where uid = '${uid}'`;
    //         const resultArr = await execute(query);

    //         if(resultArr instanceof Error) {
    //             res.status(400);
    //             throw new Error(resultArr);
    //         }

    //         res.status(200).json({
    //             success: true,
    //             message: "User registered.",
    //             data: req.body,
    //             startTime: resultArr[1],
    //             endTime: resultArr[2],
    //             totalTime: resultArr[2] - resultArr[1]
    //         });
    //     } 

    //     res.status(400);
    //     throw new Error(resultArr);
    // }

    return sendResponse(
        res,
        registeredUserDetails instanceof Error ? registeredUserDetails : {message: 'User succefully registered', userData: req.body},
        200
    )

});

const loginUser = asyncHandler( async (req, res) => {
    const { uid, uemail } = req.body;

    if(!uid || !uemail) {
        throw new CustomError('Provide user id and user email.', 400);
    }

    const queryData = [uid, uemail]

    const resultArr = await execute(_getUserUid(), queryData);

    if(!(resultArr.length)) {
        throw new CustomError('Invalid credentials.', 404);
    }

    if(!(resultArr[0].isActive)) {
        throw new CustomError('User account has been deactivated.', 404)
    }

    const token = generateToken(uemail, uid);

    return sendResponse(
        res,
        {message: 'User logged in and token sent', token},
        200
    );

});

const deleteUser = asyncHandler( async (req, res) => {
    const { uid } = req.user;

    const queryData = [uid];

    const userActiveStatus = await execute(_getUserActiveStatus(), queryData);

    if(!(userActiveStatus[0].isActive)) {
        throw new CustomError("User already deactivated.", 401);
    }

    const deletedUserDetails = await execute(_setUserAsNotActive(), queryData);

    return sendResponse(
        res,
        { message: 'User succesfully deleted.' },
        200
    )

})

module.exports = {
    getUser,
    registerUser,
    loginUser,
    deleteUser
}