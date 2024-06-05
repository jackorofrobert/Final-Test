const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
