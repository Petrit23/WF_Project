const mongoose = require('mongoose');

const savedMoviesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    imageURL: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        //match: /^[a-zA-Z0-9]+$/,
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        //match: /^[a-zA-Z0-9]+$/,
    },
    password: {
        type: String,
        required: true,
    },
    savedMovies: [savedMoviesSchema]
});

mongoose.model('User', userSchema);