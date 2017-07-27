'use-strict'

export default class AuthorController {
    constructor(winston, authorService, router){
        this.authorService = authorService;
        this.router = router;
        this.winston = winston;
        winston.info('AuthorController Initiated');
    }

    init(){
        const authorService =  this.authorService;
        const winston = this.winston;
        this.router.route({
            method: 'GET',
            path: '/authors',
            handler: function (request, reply) {
                authorService.getAuthors(function(err, authors){
                    if(err){
                        winston.error(error);
                        throw error;
                    }
                    reply(authors);
                    winston.info(authors);
                });
            }
        });

        this.router.route({
            method: 'POST',
            path: '/registerAuthor',
            handler: function (request, reply) {  
                let author = request.payload;       
                authorService.registerAuthor(author, function(error, newAuthor){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    author = newAuthor;
                    reply(author);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/removeAuthor',
            handler: function (request, reply) {  
                let author = request.payload;       
                authorService.removeAuthor(author.id, function(err, response){
                    if(err) {
                        winston.error(error);
                        throw error;
                    }
                    reply(response);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/updateAuthor',
            handler: function (request, reply) {  
                let author = request.payload;       
                authorService.updateAuthor(author, function(error, newAuthor){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    author = newAuthor;
                    reply(author);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/blockAuthor',
            handler: function (request, reply) {  
                let author = request.payload;    
                winston.info("Request recieved: id"+author.id+" remark:"+author.remark);   
                authorService.blockAuthor(author.id, author.remark, function(error, newAuthor){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    author = newAuthor;
                    reply(author);
                })
            }
        });

        this.router.route({
            method: 'GET',
            path: '/authors/{id}',
            handler: function (request, reply) {  
                let authorId = request.params.id;    
                winston.info("Request recieved: id"+authorId);   
                authorService.getAuthorByID(authorId, function(error, newAuthor){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    author = newAuthor;
                    reply(author);
                })
            }
        });
    }
}