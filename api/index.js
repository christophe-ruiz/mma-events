const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const {connect} = require('./utils/db');
const {signin, signup, protect} = require('./utils/auth');
const {signupSchema} = require('./utils/validations');
const {errorHandler} = require('./utils/errorHandler');
// const {userRouter} = require('./resources/user/user.router');
const {User} = require('./resources/user/user.model');
const {JWT_SECRET} = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', protect);
// app.use('/api/user', userRouter);
//
// app.post('/signup', async (req, res) => {
//     try {
//         await signupSchema.validateAsync(req.body);
//         const { email, password } = req.body;
//         const user = await signup({ email, password });
//         res.status(201).json({ user });
//     } catch (err) {
//         errorHandler(err, res);
//     }
// });
//
// app.post('/signin', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await signin({ email, password });
//         res.status(200).json({ user });
//     } catch (err) {
//         errorHandler(err, res);
//     }
// });

const start = async () => {
    try {
        // await connect();
        app.listen(8008, (r) => {
            console.log(`REST API on port 8008`);
        });
    } catch (err) {
        console.error(err);
    }
};

start().then(r => console.log(`Server is running on port 8008`));
