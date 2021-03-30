const Mongoose = require('mongoose');
const config = require('./config');

// Use native ES6 promises
Mongoose.Promise = global.Promise;
Mongoose.connect(config.database.url);

const db = Mongoose.connection;

db.on('error', () => {
  console.error(`MongoDB connection error ${config.database.url} \nPlease make sure MongoDB is running.`);
  process.exit();
});

db.once('open', () => {
  console.error('MongoDB connection with database succeeded.');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.error('MongoDB connection disconnected through app termination.');
    process.exit();
  });
});

module.exports = db;
