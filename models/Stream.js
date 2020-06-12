const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StreamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = Stream = mongoose.model('stream', StreamSchema);