const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    // img: {
    //     data: Buffer, contentType: String
    // },

    title: String,
    description: String,
    imageURL: String,

});

mongoose.model('Movie', movieSchema);