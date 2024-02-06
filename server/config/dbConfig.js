const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo DB Connection Successful');
});

connection.on('error', (error) => {
    console.error('Mongo DB Connection Fail:', error);
});

module.exports = connection;
