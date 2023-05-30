const mongoose = require('mongoose')

const url = 'mongodb+srv://safa:FLAvwQsDfzvUDuvO@cluster0.rhacs.mongodb.net/myblog';

mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

module.exports = mongoose;