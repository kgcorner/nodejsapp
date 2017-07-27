import AuthorDao from '../authors/dao';
import AuthorService from '../authors/service';
import AuthorController from '../authors/controller';


export default (mongoose,winston, router) => {
    const authorDao = new AuthorDao(winston, mongoose);
    const authorService = new AuthorService(winston, authorDao);
    const authorController = new AuthorController(winston, authorService, router);
    authorController.init();
}