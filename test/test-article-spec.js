import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';

import AuthorDao from '../authors/dao';
import AuthorService from '../authors/service';
import GenreDao from '../genres/dao';
import GenreService from '../genres/service';
import ArticleDao from '../articles/dao';
import ArticleService from '../articles/service';
import should from 'should';
import Winston from '../configs/winstonconfig';
describe("The Article Module", function(){
     before(function(){
            console.log('Creating DB for Article Module');
            mongoose.connect("mongodb://localhost/indianhistorytest");
        })
    const articleDao = new ArticleDao(Winston, mongoose);
    const articleService = new ArticleService(Winston, articleDao);

    it("Should create an Article", function(done){
        //Create an Author
        const authorDao = new AuthorDao(Winston, mongoose);
        const authorService = new AuthorService(Winston, authorDao);
        const author = {
            name:"Kumar Gaurav",
            username:"kg",
            email:"kumargauravgupta3@gmail.com"
        }
        authorService.registerAuthor(author, function(err,author){
            if(err)
                throw err;
            else{
                //Create Genre
                const sampleGenre = {
                                    "name": "process improvement",
                                    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                                };
                const genreDao = new GenreDao(Winston, mongoose);
                const genreService = new GenreService(Winston, genreDao);
                 genreService.createGenre(sampleGenre, function(err, genre){
                    if(err){
                        throw err;
                    }
                    else {
                        
                        //Create Article
                        const article = {
                            title:"title",
                            content: "content",
                            genre: genre._id,
                            author:author._id,
                            media:"",
                            tags:"tags",
                            link:"http://kgcorner.com/blog"                            
                        }
                        const article1 = {
                            title:"title9",
                            content: "content",
                            genre: genre._id,
                            author:author._id,
                            media:"",
                            tags:"tags",
                            link:"http://kgcorner.com/blog"                            
                        }
                        articleService.createArticle(article, function(err, article) {
                            should.not.exist(err);
                            article.title.should.equal("title");
                            article.content.should.equal("content");
                            article.tags[0].should.equal("tags");
                            article.isPublished.should.equal(false);
                            article.isBlocked.should.equal(false);
                            done();
                        })
                        articleService.createArticle(article1, function(err,article){})
                    }
                 })
            }
        });
    })

    it("Should get all articles", function(done){
        articleService.getArticles(function(err, articles){
            should.not.exist(err);
            articles.length.should.equal(2);
            done();
        })
    })

    it("Should update an article", function(done){
        articleService.getArticles(function(err, articles){
            const id = articles[0]._id;
            articles[0].title="title2";
            articleService.updateArticle(id, articles[0], function(err, article){
                should.not.exist(err);
                article.title.should.equal("title2");
                done();
            })

        })
    })

    it("Should publish the article", function(done){
         articleService.getArticles(function(err, articles){
            const article = articles[0];
            articleService.publishArticle(article._id, function(err, article){
                should.not.exists(err);
                article.isPublished.should.equal(true);
                article.isBlocked.should.equal(false);
                done();
            })
         });
    })

    it("Should Unpublish the article", function(done){
         articleService.getArticles(function(err, articles){
            const article = articles[0];
            article.isPublished.should.equal(true);
            articleService.unpublishArticle(article._id, function(err, article){
                should.not.exists(err);
                article.isPublished.should.equal(false);
                article.isBlocked.should.equal(false);
                done();
            })
         });
    })

    it("Should Block the article", function(done){
         articleService.getArticles(function(err, articles){
            const article = articles[0];
            article.isBlocked.should.equal(false);
            articleService.blockArticle(article._id, "Remark",function(err, article){
                should.not.exists(err);
                article.isBlocked.should.equal(true);
                article.remarkForBlock.should.equal("Remark");
                done();
            })
         });
    })

    it("Should unblock the article", function(done){
         articleService.getArticles(function(err, articles){
            const article = articles[0];
            article.isBlocked.should.equal(true);
            articleService.unBlockArticle(article._id, function(err, article){
                should.not.exists(err);
                article.isBlocked.should.equal(false);
                done();
            })
         });
    })

    it("Should get article by ID", function(done){
        articleService.getArticles(function(err, articles){
            const articleOriginal = articles[0];
            articleService.getArticleById(articleOriginal._id, function(err, article){
                should.not.exists(err);
                article.title.should.equal(articleOriginal.title);
                done();
            })
        });
    })

    it("Should get Article By Author", function(done){
        const authorDao = new AuthorDao(Winston, mongoose);
        const authorService = new AuthorService(Winston, authorDao);
        authorService.getAuthors(function(err, authors){
            articleService.getArticleOfAuthor(authors[0]._id, function(err, articles){
                should.not.exists(err);
                articles.length.should.equal(2);
                done();
            })
        })
    })

    it("Should get Article By Genre", function(done){
        const genreDao = new GenreDao(Winston, mongoose);
        const genreService = new GenreService(Winston, genreDao);
        genreService.getGenres(function(err, genres){
            articleService.getArticleOfGenre(genres[0]._id, function(err, articles){
                should.not.exists(err);
                articles.length.should.equal(2);
                done();
            })
        })
    })

    it("Should delete article by ID", function(done){
        articleService.getArticles(function(err, articles){
            const article = articles[0];
            articleService.deleteArticle(article._id, function(err,response){
                should.not.exist(err);
                response.deleted.should.equal(true);
                articleService.getArticleById(article._id, function(err, article){
                    should.not.exist(err);
                    should.not.exist(article);
                });
                done();
            })
        });
    })
    

    after(function(){
        console.log("Dropping database");
        mongoose.connection.dropDatabase();
        mongoose.connection.close();
    })
});