const Joi = require('joi')
let {SystemConfig,Book,Content} = require('../models')

class PageDataService {

    async index(){
        //banner
        //导航
        //各大板块及其数据
        let pageData = {
            banner:[{href:'',img:'',}],
            navigation:[{icon:'',name:'',href:''}],
            block:[
                {
                    title:'',
                    sortId:1,
                    books:[],

                }
            ],
        }
        let sysConfig = await SystemConfig.findOne()
        console.log(`系统配置:`,sysConfig)
        try {
            pageData.banner = JSON.parse(sysConfig.banner)
            pageData.navigation = JSON.parse(sysConfig.navigation)
            pageData.block = JSON.parse(sysConfig.block)          
        } catch (error) {
            console.log(`初始化配置数据失败.`)
            throw error
        }
        let books = []
        pageData.block.map(v=>books = books.concat(v.books))
        console.log(`所有需要的书籍：`,books)
        books = await Book.find({_id:{$in:books}})
        console.log(`查到的书籍:`,books)
        pageData.block = pageData.block.map(v=>
                            v.books=v.books.map(
                                    v2=>books.find(v3=>v3._id===v2)||v2))
        console.log(`页面数据:`,pageData)

        return pageData
    }

    async bookDetail(bookId){
        let pageData = {
            book:{},
            articles:[],
        }
        pageData.book = await Book.findById(bookId)
        let articles = await Content.find({bookId},{title:1,sortId:1}).sort({sortId:-1,}).limit(40)
        pageData.articles = articles

        return pageData
    }

    async article(articleid){
        let pageData = {
            article:{},
            preArticle:{},
            nextArticle:{}
        }
        pageData.article = await Content.findById(articleid)
        let qryPre = {bookId:pageData.article.bookId,sortId:{$lt:pageData.article.sortId}}
        let qryNext = {bookId:pageData.article.bookId,sortId:{$gt:pageData.article.sortId}}
        let [pre,next] = await Promise.all([
            Content.findOne(qryPre,{title:1,sortId:1}).sort({sortId:-1}),
            Content.findOne(qryNext,{title:1,sortId:1}).sort({sortId:1})
        ])
        console.log(qryPre)
        pageData.preArticle = pre
        pageData.nextArticle = next
        console.log(`pageData : `,pageData)      

        return pageData
    }

    async bookList( data = {} ){
        let pageData = {
            books : [],
            totalItem:0,
        }
        //分类、标签、作者 筛选
        //阅读、点赞、等排序
        let query = await Joi.validate(data,Joi.object({
            categores:Joi.string(),
            tags:Joi.string(),
            serialize:Joi.string(),
        }),{stripUnknown:true}),
            sort = {date:-1},
            {current=1,pageSize=20} = data
        if(data.keyword){
            query.name = {$regex:data.keyword}
        }

        pageData.books = await Book.find(query).sort(sort).limit(pageSize).skip(current*pageSize-pageSize)
        pageData.totalItem = await Book.count(query)

        return pageData
    }

    
}

module.exports = new PageDataService()