const mongoose  = require('mongoose');

const tvSeriesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true,"name is required"]
    },
    summary: {
        type: String,
        required: [true, 'Enter Course Title']
    },
    imdb_rating: {
        type: Number,
        default: 1  
    },
    genre_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
const tvSeries = mongoose.model('tvSeries', tvSeriesSchema);
module.exports = tvSeries;