const mongoose = require('mongoose');

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
        match: /^[a-zA-Z0-9]+$/,
    },
    password: {
        type: String,
        required: true,
    }
});

mongoose.model('User', userSchema);