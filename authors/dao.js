import DAO from '../templates/abstractdao';
import {
            getAuthors,
            registerAuthor,
            removeAuthor,
            updateAuthor,
            blockAuthor
        } from './model.js';

export default class AuthorDao extends DAO {
    constructor(winston, mongoose){
        super(mongoose);
        this.winston = winston;
        this.winston.info('AuthorDao Initialized');
    }

    getAuthors( callback, limit){
        getAuthors(callback, limit);   
    }

    registerAuthor(author, callback){
        registerAuthor(author, callback);
    }

    removeAuthor(authorId, callback) {
        removeAuthor(authorId, callback);
    }

    updateAuthor(author, option, callback) {
        updateAuthor(author, option, callback);
    }

    blockAuthor(id, remark, callback) {
        blockAuthor(id, remark, callback);
    }

    getAuthorByID(id, callback) {
        getAuthorByID(id, callback);
    }
    
}

