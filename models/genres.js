let mongoose = require('mongoose');

let genre = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    createDate:{
        type:Date,
        default:Date.Now
    }
});

let Genre = module.exports = mongoose.model('Genre',genre);

module.exports.getGenres = (callback, limit) => {
    Genre.find(callback).limit(limit);
}