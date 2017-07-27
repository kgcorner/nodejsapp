import mongoose from 'mongoose';
require('./test-genre-spec');
require('./test-author-spec');

describe("Indian History tests", function(){
    before(function(){       
        console.log('Creating DB for Testing');
        mongoose.connect("mongodb://localhost/indianhistorytest");       
    })
    after(function(){       
        console.log("Dropping database");
        mongoose.connection.dropDatabase();        
    }) 
})

class TestDBUtil {
    constructor(){
        this.testCaseCount = 0;
    }

    before(){
        if(this.testCaseCount==0){
            console.log('Creating DB for Testing');
            mongoose.connect("mongodb://localhost/indianhistorytest");
        }
        this.testCaseCount ++;
    }
    after(){
        this.testCaseCount --;
        if(this.testCaseCount==0) {
            console.log("Dropping database");
            mongoose.connection.dropDatabase();
        }
    } 
}

var Singleton = (function () {
    var instance;
 
    function createInstance() {
        var object = new TestDBUtil();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Singleton;