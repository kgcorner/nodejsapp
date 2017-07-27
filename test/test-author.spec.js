import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import AuthorDao from '../authors/dao';
import AuthorService from '../authors/service';
import should from 'should';
import Winston from '../configs/winstonconfig';
describe("The Author Module", function(){
     before(function(){
            console.log('Creating DB for Author Module');
            mongoose.connect("mongodb://localhost/indianhistorytest");
        })
    const authorDao = new AuthorDao(Winston, mongoose);
    const authorService = new AuthorService(Winston, authorDao);

    it("Should register Author with name: 'Kumar Gaurav'", function(done){
        const author = {
            name:"Kumar Gaurav",
            username:"kg",
            email:"kumargauravgupta3@gmail.com"
        }
        authorService.registerAuthor(author, function(err,author){
            should.not.exist(err);
            author.name.should.equal("Kumar Gaurav");
            author.email.should.equal("kumargauravgupta3@gmail.com");
            author.username.should.equal("kg");
            author.isBlocked.should.equal(false);
            done();
        })
    });

    it("Should list all users", function(done){
        const author = {
            name:"Kewal Singh",
            username:"kewal",
            email:"kewal@gmail.com"
        }
        authorService.registerAuthor(author,function(err, author){
            authorService.getAuthors(function(err, authors){
                should.not.exist(err);
               // Winston.info("Authors:"+authors);
                authors.length.should.equal(2);
                authors[0].name.should.equal("Kumar Gaurav");
                done();
            })
        });
        

    });

    

    it("Should update Kumar Gaurav's username to urprob", function(done){
        authorService.getAuthors(function(err, authors){
            authors[0].username = "urprob";
            authorService.updateAuthor(authors[0], function(err, author){
                should.not.exist(err);
                author.username.should.equal("urprob");
                done();
            })
            
        })
    });

    it("should block user Kumar Gaurav", function(done){
        authorService.getAuthors(function(err, authors){
            const id = authors[0]._id;
            
            authorService.blockAuthor(id,"Blocking for testing", function(err, author){
                should.not.exist(err);
                author.isBlocked.should.equal(true);
                done();
            })
            
        })
    })

    it("should remove user Kumar Gaurav", function(done){
        authorService.getAuthors(function(err, authors){
            const id = authors[0]._id;
            
            authorService.removeAuthor(id, function(err, response){
                should.not.exist(err);
                response.deleted.should.equal(true);
                done();
            })
            
        })
    })


    after(function(){
        console.log("Dropping database");
        mongoose.connection.dropDatabase();
        mongoose.connection.close();
    })
});