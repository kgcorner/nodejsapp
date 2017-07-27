import DAO from '../templates/abstractdao';
import {
            getArticles,
            createArticle,
            updateArticle,
            publishArticle,
            unpublishArticle,
            blockArticle,
            deleteArticle,
            getArticleById,
            getArticleOfAuthor,
            getArticleOfGenre,
            unBlockArticle
        } from './model.js';

export default class ArticleDao extends DAO {
    constructor(winston, mongoose){
        super(mongoose);
        this.winston = winston;
        this.winston.info('ArticleDao Initialized');
    }

    getArticles( callback, limit){
        getArticles(callback, limit);   
    }
    createArticle(article, callback){
        createArticle(article, callback);
    }

    updateArticle(articleId, article, option, callback) {
        updateArticle(articleId, article, option, callback);
    }

    publishArticle(articleId, callback) {
        publishArticle(articleId, callback);
    }

    unpublishArticle(articleId, callback) {
        unpublishArticle(articleId, callback);
    }

    blockArticle(articleId, remarks, callback) {
        blockArticle(articleId, remarks, callback);
    }

    unBlockArticle(articleId, callback) {
        unBlockArticle(articleId, callback);
    }

    deleteArticle(articleId, callback) {
        deleteArticle(articleId, callback);
    }

    getArticleById(articleId, callback) {
        getArticleById(articleId, callback);
    }

    getArticleOfAuthor(authorId, callback) {
        getArticleOfAuthor(authorId, callback);
    }

    getArticleOfGenre(genreId, callback) {
        getArticleOfGenre(genreId, callback);
    }
}

