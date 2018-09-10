const Joi = require('joi')

const BookModel = require("../models").Book;
const ContentTagModel = require("../models").ContentTag;
const MessageModel = require("../models").Message;
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const Rule = {
    create:Joi.object({
        name:Joi.string().required(),
        author:Joi.string(),

        type:Joi.string().default('novel'),
        keywords:Joi.string(),
        categories:Joi.array().items(Joi.string()).single(),
        sImg:Joi.string(),
        description:Joi.string(),
        serialize:Joi.boolean(),
        wordNum:Joi.number(),
        clickNum:Joi.number(),
        likeNum:Joi.number(),
    }),
    query:Joi.object({
        name:Joi.string(),
        author:Joi.string(),
        serialize:Joi.boolean(),
        categories:Joi.array().items(Joi.string()).single(),
        type:Joi.string(),
    }),
    page:Joi.object({current:Joi.number().default(1),pageSize:Joi.number().default(10)}),
}
class BookService{
    constructor(){}
    async addBook(data = {}){
        let book = await Joi.validate(data,Rule.create,{stripUnknown:true})
        //检查书名与作者是否重复
        let a = await BookModel.findOne({name:book.name,auther:book.auther})
        if(a){
            throw new Error(`[${book.name}-${book.auther}]已存在.`)
        }
        book = await BookModel.create(book)
        return book
    } 
    async getBooks(data = {}){
        let {pageSize=10,current=1,} = await Joi.validate(data,Rule.page,{stripUnknown:true})
        let queryObj = await Joi.validate(data,Rule.query,{stripUnknown:true}),
            sortBy = {craeteDate:-1}
        if(queryObj.name)queryObj.name = {'$regex':queryObj.name}

        let docs = await BookModel.find(queryObj).limit(pageSize).skip(pageSize*current-pageSize).sort(sortBy).populate([
            {path:'categories',select:'_id defaultUrl name'},
            {path:'tags',select:'_id name'},

        ]).exec()
        let totalItems = await BookModel.count(queryObj)
        return {pageSize,current,docs,totalItems}
    }
    async updateBook(data = {}){
        let id = await Joi.validate(data.id,Joi.string().required()),
            update = await Joi.validate(data,Joi.object({
                categories:Joi.array().items(Joi.string()).single(),
                sImg:Joi.string(),
                description:Joi.string(),
                serialize:Joi.boolean(),
                wordNum:Joi.number(),
                clickNum:Joi.number(),
                likeNum:Joi.number(),           
            }),{stripUnknown:true})
        let doc = await BookModel.findByIdAndUpdate(id,update,{new:true})
        return doc
    }
    async removeBook( data = {}){
        let id = await Joi.validate(data.id,Joi.string().required()) 
        let doc = await BookModel.findByIdAndRemove(id)
        return doc
    }


}

module.exports = new BookService()