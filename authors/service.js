'use-strict'

export default class AuthorService {
    constructor(winston,authorDao){
        this.authorDao = authorDao;
        this.winston = winston;
        winston.info('AuthorService initiated');
    }

    getAuthors(callback){
        const winston = this.winston;
        this.authorDao.getAuthors(function(err, author){
            if(err){
                winston.error(err);
                throw err;
            }
            callback(err,author);
        },5);
    }

    registerAuthor(author, callback) {
        const winston = this.winston;
        this.authorDao.registerAuthor(author, function(err, author){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Author Registered, Name:"+author.name+" id:"+author._id);
            callback(err, author);
        })
    }

    removeAuthor(authorId, callback) {
        const winston = this.winston;
        this.authorDao.removeAuthor(authorId, function(err){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Author Removed, id:"+authorId);
            callback(err, {deleted:true});
        })
    }

    updateAuthor(author, callback) {
        const winston = this.winston;
        this.authorDao.updateAuthor(author, {new: true}, function(err, author){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Author Updated, id:"+author._id);
            callback(err, author);
        })
    }

    blockAuthor(authorId, remark, callback) {
        const winston = this.winston;
        winston.info("In Service: Blocknig user");
        this.authorDao.blockAuthor(authorId, remark, function(err, author){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Author blocked, ID:"+authorId);
            callback(err, author);
        })
    }

    getAuthorByID(authorId, callback) {
        const winston = this.winston;
        winston.info("In Service: Fetching user with ID:"+id);
        this.authorDao.getAuthorByID(authorId, function(err, author){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Author ID:"+authorId+" fetched successfully");
            callback(err, author);
        })
    }
}