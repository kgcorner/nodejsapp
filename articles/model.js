import mongoose from 'mongoose';

let article = mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    content:{
        type:String,
        required:true
    },
    genre:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    author:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    media:{
        type:Array,
        required: false
    },
    tags:{
        type:Array,
        required:false
    },
    link:{
        type:String,
        required: false
    },
    eventTime:{
        type:String,
        required:false
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedOn: {
        type:Date,
        required: false
    },
    isBlocked: {
        type:Boolean,
        default: false
    },
    remarkForBlock: {
        type:String,
        required: false
    },
    blockedOn: {
        type:Date,
        required: false
    }
});

let Article = module.exports = mongoose.model('article',article);

module.exports ={
    getArticles : (callback, limit) => {
        Article.find(callback).limit(limit);
    },

    createArticle: (article, callback) => {
        Article.create(article, callback);
    },

    updateArticle: (articleId, article, option, callback) => {
        const query = {
            _id: articleId
        }
        Article.findOneAndUpdate(query, article, option, callback);
    },

    publishArticle: (articleId, callback) => {
        const query = {
            _id: articleId
        }
        const article = {
            isPublished: true,
            publishedOn: new Date()
        }
        const option = {
            new : true
        }
        Article.findOneAndUpdate(query, article, option, callback);
    },

    unpublishArticle: (articleId, callback) => {
        const query = {
            _id: articleId
        }
        const article = {
            isPublished: false,
            publishedOn: null
        }
        const option = {
            new : true
        }
        Article.findOneAndUpdate(query, article, option, callback);
    }, 

    getArticleById: (articleId, callback) => {
        const query = {
            _id: articleId
        }
        Article.findOne(query, callback);
    },

    deleteArticle: (articleId, callback) => {
        const query = {
            _id: articleId
        }
        Article.remove(query, callback);
    },

    blockArticle: (articleId, remark, callback) => {
        const query = {
            _id: articleId
        }
        const article = {
            isBlocked: true,
            remarkForBlock: remark,
            blockedOn: new Date()
        }
        const option = {
            new: true
        }
        Article.findOneAndUpdate(query, article, option, callback);
    },

    getArticleOfAuthor: (authorId, callback) => {
        const query = {
            author: authorId
        }

        Article.find(query, callback);        
    },

    getArticleOfGenre: (genreId, callback) => {
        const query = {
            genre: genreId
        }
        Article.find(query, callback);
    },

    unBlockArticle: (articleId, callback) => {
        const query = {
            _id: articleId
        }
        const article = {
            isBlocked: false,
            remarkForBlock: "",
            blockedOn: null
        }
        const option = {
            new: true
        }
        Article.findOneAndUpdate(query, article, option, callback);
    },



}