const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z0-9]+$/,
        index: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z0-9]+$/,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('Sign up', userSchema);