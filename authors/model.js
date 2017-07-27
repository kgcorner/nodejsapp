import mongoose from 'mongoose';

let author = mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    socialProfiles:{
        type:Array,
        required:false
    },
    isBlocked:{
        type: Boolean,
        required: true,
        default: false
    },
    createDate:{
        type:Date,
        default:Date.now
    }
});

let Author = module.exports = mongoose.model('author',author);

module.exports ={
    getAuthors : (callback, limit) => {
        Author.find(callback).limit(limit);
    },

    registerAuthor: (author, callback) => {
        Author.create(author, callback);
    },

    removeAuthor: (authorId, callback) =>{
        const query = {
            _id: authorId
        } 
        Author.remove(query, callback);
    },

    updateAuthor: (author, option, callback) => {
        const query = {
            _id:author.id
        }
        Author.findOneAndUpdate(query, author, option, callback);
    },

    blockAuthor: (id, remark, callback) => {
        
        const author = {
            isBlocked: true
        }
        const query = {
            _id:id
        }
        const option = {
            new: true
        }
        Author.findOneAndUpdate(query, author, option, callback);
    },

    getAuthorByID: (authorid, callback) => {
        const query = {
            _id:authorid
        }
        Author.findOne($query, callback);
    }

}