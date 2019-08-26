let mongoose = require('mongoose');

// Score schema
let scoreSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

let score = module.exports = mongoose.model('Scores', scoreSchema);