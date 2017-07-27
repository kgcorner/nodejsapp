'use-strict'

export default class ArticleController {
    constructor(winston, articleService, router){
        this.articleService = articleService;
        this.router = router;
        this.winston = winston;
        winston.info('ArticleController Initiated');
    }

    init(){
        const articleService =  this.articleService;
        const winston = this.winston;
        this.router.route({
            method: 'GET',
            path: '/articles',
            handler: function (request, reply) {
                articleService.getArticles(function(articles){
                    reply(articles);
                    winston.info(articles);
                });
            }
        });

        this.router.route({
            method: 'POST',
            path: '/createArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.createArticle(article, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/updateArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.updateArticle(article.id, article, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });
        
        this.router.route({
            method: 'POST',
            path: '/publishArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.publishArticle(article.id, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });
        
        this.router.route({
            method: 'POST',
            path: '/unpublishArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.unpublishArticle(article.id, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/blockArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.blockArticle(article.id, article.remarks, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/unBlockArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.unBlockArticle(article.id, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/deleteArticle',
            handler: function (request, reply) {  
                let article = request.payload;       
                articleService.deleteArticle(article.id, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'GET',
            path: '/articles/{id}',
            handler: function (request, reply) {  
                let articleId = request.params.id;       
                articleService.getArticleById(articleId, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    let article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'GET',
            path: '/articles/authors/{authorId}',
            handler: function (request, reply) {  
                let authorId = request.params.authorId;       
                articleService.getArticleOfAuthor(authorId, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    let article = newArticle;
                    reply(article);
                })
            }
        });

        this.router.route({
            method: 'GET',
            path: '/articles/genres/{genreId}',
            handler: function (request, reply) {  
                let genreId = request.params.genreId;       
                articleService.getArticleOfGenre(genreId, function(error, newArticle){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    let article = newArticle;
                    reply(article);
                })
            }
        });

        
    }
}