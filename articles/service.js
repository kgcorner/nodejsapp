'use-strict'

export default class ArticleService {
    constructor(winston,articleDao){
        this.articleDao = articleDao;
        this.winston = winston;
        winston.info('ArticleService initiated');
    }

    getArticles(callback){
        const winston = this.winston;
        this.articleDao.getArticles(function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            callback(err, article);
        },5);
    }

    createArticle(article, callback) {
        const winston = this.winston;
        this.articleDao.createArticle(article, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            callback(err, article);
        })
    }

    updateArticle(articleId, article, callback) {
        const winston = this.winston;
        const option = {
            new: true
        }        
        this.articleDao.updateArticle(articleId, article, option, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Article "+articleId+" updated successfully");
            callback(err, article);
        });
    }

    publishArticle(articleId, callback) {
        const winston = this.winston;
        this.articleDao.publishArticle(articleId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Article "+articleId+" published successfully");
            callback(err, article);
        });
    }

    unpublishArticle(articleId, callback) {
        const winston = this.winston;
        this.articleDao.unpublishArticle(articleId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Article "+articleId+" unpublished successfully");
            callback(err, article);
        });
    }

    blockArticle(articleId, remarks, callback) {
        const winston = this.winston;
        this.articleDao.blockArticle(articleId, remarks, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Article "+articleId+" Blocked successfully");
            callback(err, article);
        });
    }

    unBlockArticle(articleId, callback) {
        const winston = this.winston;
        this.articleDao.unBlockArticle(articleId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Article "+articleId+" UnBlock successfully");
            callback(err, article);
        });
    }

    deleteArticle(articleId, callback) {
        const winston = this.winston;
        this.articleDao.deleteArticle(articleId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Article "+articleId+" deleted successfully");
            const response = {
                deleted: true
            }
            callback(err, response);
        });
    }

    getArticleById(articleId, callback) {
        const winston = this.winston;
        this.articleDao.getArticleById(articleId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info(" Fetching Article "+articleId);
            callback(err, article);
        });
    }

    getArticleOfAuthor(authorId, callback) {
        const winston = this.winston;
        this.articleDao.getArticleOfAuthor(authorId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Fetching Artcicle of Author "+authorId);
            callback(err, article);
        });
    }

    getArticleOfGenre(genreId, callback) {
        const winston = this.winston;
        winston.info("Calling getByGenre");
        this.articleDao.getArticleOfGenre(genreId, function(err, article){
            if(err){
                winston.error(err);
                throw err;
            }
            winston.info("Fetching Article of genre "+genreId);
            callback(err, article);
        });
    }
}