const express = require('express');

const app = express();
const mongo = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
require('./database/config');

// Import Routes
require('./routes/cron');
const authRoute = require('./routes/auth/auth');
const leaderBoardRoute = require('./routes/leaderboard/leaderboard');
const category = require('./routes/categories/categories');
const quiz = require('./routes/quiz/quiz');
const score = require('./routes/score/score');
const payment = require('./routes/payment/payment');

// MiddleWare
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Auth-Token, Content-Type, Accept');
  next();
});
// Route Middelware
app.use('/api/user', authRoute);
app.use('/api/leaderBoard', leaderBoardRoute);
app.use('/api/category', category);
app.use('/api/quiz', quiz);
app.use('/api/score', score);
app.use('/api/pay', payment);
app.get('/', (req, res) => {
  res.status(200).send('Server Health OK');
});
const port = process.env.port || 8000;
app.listen(port);
