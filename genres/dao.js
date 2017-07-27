import DAO from '../templates/abstractdao';
import {
        getGenres, 
        createGenre, 
        updateGenreByID, 
        getGenreByID,
        deleteGenreById
       } from './model'; 

export default class GenreDao extends DAO {
    constructor(winston, mongoose){
        super(mongoose);
        this.winston = winston;
        this.winston.info('GenereDao Initialized');
    }

    getGenres( callback, limit){
        getGenres(callback, limit);   
    }
    createGenre(genre, callback){
        createGenre(genre, callback);
    }

    deleteGenreById(id, callback){
        deleteGenreById(id, callback);
    }

    getGenreByID(id, callback) {
        getGenreByID(id, callback);
    }

    updateGenreByID(id, genre, option, callback) {
        updateGenreByID(id, genre, option, callback);
    }
}

