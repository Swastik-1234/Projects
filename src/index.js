const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const { userRouter } = require('./user/routes');
const { questionRouter } = require('./question/routes');
const { answerRouter } = require('./answer/routes');
const { commentRouter } = require('./comment/routes');

const { errorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// helper middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/v1/user', userRouter);
app.use('/v1/question', questionRouter);
app.use('/v1/answer', answerRouter);
app.use('/v1/comment', commentRouter);

// error handler middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Server running at port ", PORT);
    }
})