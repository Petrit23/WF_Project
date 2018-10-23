const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    paragraph: String,
});

mongoose.model('About', aboutSchema);