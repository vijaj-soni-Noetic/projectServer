const mongoose  = require('mongoose');

const genreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    name: {
        type: String,
        required: [true, ' name  requied']
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
const genre = mongoose.model('genre', genreSchema);
module.exports = genre;