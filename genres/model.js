let mongoose = require('mongoose');

let genre = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    createDate:{
        type:Date,
        default:Date.now
    }
});

let Genre = module.exports = mongoose.model('genre',genre);

module.exports ={
    getGenres : (callback, limit) => {
        Genre.find(callback).limit(limit);
    },

    createGenre: (genre, callback) => {        
        Genre.create(genre, callback);
    },

    deleteGenreById: (id, callback) => {
        const query = {
            _id:id
        }
        Genre.remove(query, callback);
    },

    getGenreByID: (id, callback) => {
        const query = {
            _id:id
        }
        Genre.find(query, callback);
    },

    updateGenreByID: (id, genre, option, callback) => {
        const query = {
            _id:id
        };
        
        Genre.findOneAndUpdate(query, genre, option, callback);
    }
}