const mongo = require('mongoose');

const userSchema = new mongo.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    default: 0,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  expiry: {
    type: Date,
    default: 0,
  },
  source: {
    type: String,
    default: 'local',
  },
  quizLog: {
    type: Array,
    default: [],
  },
});

module.exports = mongo.model('User', userSchema);
