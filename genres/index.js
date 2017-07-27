import GenreDao from '../genres/dao';
import GenreService from '../genres/service';
import GenreController from '../genres/controller';


export default (mongoose,winston, router) => {
    const genreDao = new GenreDao(winston, mongoose);
    const genreService = new GenreService(winston, genreDao);
    const genreController = new GenreController(winston, genreService, router);
    genreController.init();
}