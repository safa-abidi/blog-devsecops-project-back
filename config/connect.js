const mongoose = require('mongoose')
require('dotenv').config();


const url = process.env.MONGODB_URL;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

module.exports = mongoose;