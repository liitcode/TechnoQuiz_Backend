const express = require('express');

const app = express();
const dotenv = require('dotenv');

dotenv.config();
require('./database/config');
require('./routes/cron');

// Import Routes
const Sentry = require('@sentry/node');
// eslint-disable-next-line no-unused-vars
const Tracing = require('@sentry/tracing');
const authRoute = require('./routes/auth/auth');
const leaderBoardRoute = require('./routes/leaderboard/leaderboard');
const category = require('./routes/categories/categories');
const quiz = require('./routes/quiz/quiz');
const score = require('./routes/score/score');
const payment = require('./routes/payment/payment');

Sentry.init({
  dsn: 'https://91f8b12113b74cfc9d213e92f39a0686@o878782.ingest.sentry.io/5831144',
  tracesSampleRate: 1.0,
});

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
  res.status(200).send('Server Health @ 100%');
});

const port = process.env.port || 8000;
app.listen(port);
