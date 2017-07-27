import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import GenreDao from '../genres/dao';
import GenreService from '../genres/service';
//import dbConfig from '../configs/dbconfig';
import should from 'should';
import Winston from '../configs/winstonconfig';
//Test Sequence
//Test Model
//Test Dao
//Test Service



    describe("The Genre Module", function(){
        before(function(){
            console.log('Creating DB for Genre Module');
            mongoose.connect("mongodb://localhost/indianhistorytest");
        })
        
        const genreDao = new GenreDao(Winston, mongoose);
        const genreService = new GenreService(Winston, genreDao);
        it("Model create genre with name 'process improvement'", function (done){
            const sampleGenre = {
                                    "name": "process improvement",
                                    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                                };
                genreService.createGenre(sampleGenre, function(err, genre){
                should.not.exist(err);
                genre.name.should.equal('process improvement');
                done();
            })            
        })

        it('Should return genre named "process improvement" ', function(done){
            genreService.getGenres(function(err, genres){  
                genres[0].name.should.equal('process improvement');
                done();
            },5);
        })

        it('Should update the genre', function(done){
             genreService.getGenres(function(err, genres){                
                
                const id = genres[0]._id;
                const sampleGenre = {
                                        "name": "Dynasty",
                                        "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
                                    };
                genreService.updateGenreByID(id, sampleGenre, function(genre){
                    
                    genreService.getGenreByID(id, function(genre){                        
                        genre.name.should.equal('Dynasty');
                        done();
                    });
                });                
            },5);
        })
        
        it("should fetch Genre by ID", function(done){
            genreService.getGenres(function(err, genres){      
                const id = genres[0]._id;
                const genreToTest = genres[0];
                genreService.getGenreByID(id, function(foundGenre){
                    foundGenre.name.should.equal(genreToTest.name);
                    done();
                })
            })
        })

        it('Should delete genres by ID', function(done){
            genreService.getGenres(function(err, genres){    
                const id = genres[0]._id;
                const genreToTest = genres[0];
                genreService.deleteGenreById(id, function(result){
                    result.deleted.should.equal(true);
                    done();
                })
            })
        })

        

        after(function(){
            console.log("Dropping database");
            mongoose.connection.dropDatabase();
            mongoose.connection.close();
        })
    })
    