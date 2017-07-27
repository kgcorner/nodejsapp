'use-strict'

export default class GenreController {
    constructor(winston, genreService, router){
        this.genreService = genreService;
        this.router = router;
        this.winston = winston;
        winston.info('GenreController Initiated');
    }

    init(){
        const genreService =  this.genreService;
        const winston = this.winston;
        this.router.route({
            method: 'GET',
            path: '/genres',
            handler: function (request, reply) {
                genreService.getGenres(function(error, genres){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    reply(genres);
                    winston.info(genres);
                });
            }
        });

        this.router.route({
            method: 'POST',
            path: '/createGenres',
            handler: function (request, reply) {  
                let genre = request.payload;       
                genreService.createGenre(genre, function(error, createdGenre){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    genre = createdGenre;
                    reply(genre);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/deleteGenreById',
            handler: function (request, reply) {  
                let genre = request.payload;       
                genreService.deleteGenreById(genre.id, function(error, createdGenre){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    genre = createdGenre;
                    reply(genre);
                })
            }
        });

        this.router.route({
            method: 'POST',
            path: '/updateGenre',
            handler: function (request, reply) {  
                let genre = request.payload;       
                genreService.updateGenreByID(genre.id, genre, function(error, createdGenre){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    genre = createdGenre;
                    reply(genre);
                })
            }
        });

         this.router.route({
            method: 'GET',
            path: '/genres/{id}',
            handler: function (request, reply) {  
                let genreId = request.params.id;       
                genreService.getGenreByID(genreId, function(error, createdGenre){
                    if(error) {
                        winston.error(error);
                        throw error;
                    }
                    genre = createdGenre;
                    reply(genre);
                })
            }
        });
    }
}