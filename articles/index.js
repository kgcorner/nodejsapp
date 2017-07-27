import ArticleDao from '../articles/dao';
import ArticleService from '../articles/service';
import ArticleController from '../articles/controller';


export default (mongoose,winston, router) => {
    const articleDao = new ArticleDao(winston, mongoose);
    const articleService = new ArticleService(winston, articleDao);
    const articleController = new ArticleController(winston, articleService, router);
    articleController.init();
}