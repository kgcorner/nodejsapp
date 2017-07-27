'use-strict'

export default class GenreService {
    constructor(winston,genreDao){
        this.genreDao = genreDao;
        this.winston = winston;
        winston.info('GenreService initiated');
    }

    getGenres(callback){
        const winston = this.winston;
        this.genreDao.getGenres(function(err, genre){
            if(err){
                winston.error(err);
                throw err;
            }
            callback(err,genre);
        },5);
    }

    createGenre(genre, callback) {
        const winston = this.winston;
        this.genreDao.createGenre(genre, function(err, genre){
            if(err){
                winston.error(err);
                throw err;
            }
            callback(err, genre);
        })
    }

    deleteGenreById(id, callback){
        const winston = this.winston;
        this.genreDao.deleteGenreById(id, function(err){
            if(err)
                throw err;
            callback({"deleted":true});
        });
    }

    getGenreByID(id, callback) {
        const winston = this.winston;
        this.genreDao.getGenreByID(id, function(err, genres){
            if(err)
                throw err;
            callback(genres[0]);
        })
    }

    updateGenreByID(id, genre, callback) {
        const winston = this.winston;        
        this.genreDao.updateGenreByID(id, genre, { new: true }, function(err, genres){
            if(err)
                throw err;
                    
            callback(genres[0]);
        })
    }
}