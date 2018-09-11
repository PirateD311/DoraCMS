

const Joi = require('joi')

const ContentModel = require("../models").Content;
const ContentTagModel = require("../models").ContentTag;
const MessageModel = require("../models").Message;
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');


const Rules = {
    create:Joi.object().keys({
        title:Joi.string().required().min(5).max(50),
        stitle:Joi.string().empty(''),
        categories:Joi.array().items(Joi.string()).single(),
        tags:Joi.array().items(Joi.string()).single(),   //need to format
        discription:Joi.string().min(5).max(100),
        comments:Joi.string().required().min(5),
        date:Joi.date().default(Date.now()),
        sImg:Joi.string().empty(''),
        author:Joi.string(),
        bookId:Joi.string(),
        contributor:Joi.string(),
        state:Joi.boolean().default(true),
        status:Joi.string().default('publish'),
        isTop:Joi.number().default(0),
        clickNum:Joi.number().default(1),
        form:Joi.string().default('1'),
        isVip:Joi.boolean().default(false),
        star:Joi.number().default(0).min(0).max(5),
        hiddenContent:Joi.string().empty(''),
        hiddenType:Joi.number().default(0),
        refined:Joi.boolean()
    }),
    index:Joi.object().keys({
        current:Joi.number().default(1),
        pageSize:Joi.number().default(10),
        title:Joi.string(),
        bookId:Joi.string(),
        sortby:Joi.string(),
        typeId:Joi.string(),
        tagName:Joi.string(),
        searchkey:Joi.string(),
        model:Joi.string().default('normal'),
        state:Joi.boolean().default(true),
        isVip:Joi.boolean(),
        status:Joi.string().default('publish'),
        isTop:Joi.number(),
    }),
    update:Joi.object().keys({
        // _id:Joi.string().required(),
        title:Joi.string(),
        bookId:Joi.string(),
        stitle:Joi.string().min(5).max(40),
        categories:Joi.array().items(Joi.string()).single(),
        tags:Joi.array(),   //need to format
        discription:Joi.string().min(5).max(100),
        comments:Joi.string().min(5),
        date:Joi.date(),
        sImg:Joi.string(),
        // author:Joi.string(),
        state:Joi.boolean(),
        status:Joi.string(),
        isTop:Joi.number(),
        clickNum:Joi.number(),
        form:Joi.string(),
        isVip:Joi.boolean(),
        star:Joi.number().min(0).max(5),
        hiddenContent:Joi.string().empty(''),
        hiddenType:Joi.number(),     
        refined:Joi.boolean(),   
    })
}
class ContentService {
    constructor(){

    }

    //获得文章
    async getContents(data){
        let {current,pageSize,
            sortby, //排序规则
            typeId, //分类id
            tagName, // 文章tag
            searchkey,// 搜索关键字
            state,  //弃用的字段
            isVip,//只查询vip内容
            status, //文章状态
            isTop,  //置顶文章
            model,  // 查询模式 full/normal/simple
            bookId,
        } = await Joi.validate(data,Rules.index,{stripUnknown:true})
        // 条件配置
        let queryObj = {
            state,status
        }, 
        sortObj = { date: -1 }, files = null;            
        //过滤项
        if(queryObj.status==='all')delete queryObj.status  //返回所有状态文章          
        if (typeId && typeId != 'indexPage') {  //分类过滤
            queryObj.categories = typeId;
            if(typeId === 'vip'){
                delete queryObj.categories;
                queryObj.isVip = true;
            }
        } 
        if(bookId)queryObj.bookId = bookId      
        if (tagName) {  //标签过滤
            let targetTag = await ContentTagModel.findOne({ name: tagName });
            if (targetTag) {
                queryObj.tags = targetTag._id;
                // 如果有标签，则查询全部类别
                delete queryObj.categories;
            }
        }     
        if (searchkey) {    //标题关键词搜索
            console.log('包括关键词.',searchkey)
            // let reKey = new RegExp(searchkey, 'i')
            // queryObj.comments = { $regex: reKey }
            queryObj.title = { $regex: searchkey }
        }    
        //排序规则
        if (sortby) {
            let pre = '-'
            if( sortby[0]==='-' || sortby[0]==='+' ){
                pre = sortby[0]
                sortby = sortby.substr(1)
            }
            delete sortObj.date;
            sortObj[sortby] = pre==='-'?-1:1
        }           

        //返回的字段  
        if (model === 'simple') {
            files = {
                id: 1,
                title: 1,
                author: 1,
                type:1,
                sImg: 1,
                stitle: 1,
                updateDate: 1,
                clickNum:1,
                isVip:1,
                likeNum:1,
                commentNum:1,
            }
        } else if (model === 'normal') {
            files = {
                comments:0,
                images:0,
                likeUserIds:0,
            }
        }else if (model === 'all'){
            files = {}
        }     
        console.log(`查询条件:`,queryObj,'排序条件：',sortObj)       
        const contents = await ContentModel.find(queryObj, files).sort(sortObj).skip(pageSize * (Number(current) - 1)).limit(Number(pageSize)).populate([{
            path: 'author',
            select: 'name -_id'
        },
        {
            path : 'contributor',
            select:'name _id'
        },
        {
            path: 'categories',
            select: 'name defaultUrl _id'
        }, {
            path: 'tags',
            select: 'name _id'
        }]).exec();   
        const totalItems = await ContentModel.count(queryObj);

        return {
            contents,totalItems,current,pageSize
        }
    }
    //获得文章详情
    async getContentById(targetId){
            const content = await ContentModel.findOneAndUpdate({ _id: targetId }, { '$inc': { 'clickNum': 1 } }).populate([{
                path: 'author', 
                select: 'name -_id'
            },
            {
                path: 'tags',
                select: 'name _id'
            },
            {
                path: 'categories',
                select: 'name _id'
            }]).exec();
            const commentNum = await MessageModel.count({ contentId: targetId });
            content && (content.commentNum = commentNum);
            // 推荐文章查询
            const totalContents = await ContentModel.count({});
            const randomArticles = await ContentModel.find({}, 'stitle sImg').skip(Math.floor(totalContents * Math.random())).limit(4);
            return {content,commentNum,totalContents,randomArticles}
    }
    //文章发布
    async addContent(data = {}){
        let doc = await Joi.validate(data,Rules.create,{stripUnknown:true})
        //提取内容中所有图片
        if(doc.comments){
            let imgs = this.getAllImgUrl(doc.comments)
            console.log('提取的所有图片:',imgs)
            doc.images = imgs
        }
        //默认选择第一张图片作为特色图
        if(doc.images && !doc.sImg){
            doc.sImg = doc.images[0]
        }
        if(!doc.stitle)doc.stitle = doc.title.substr(0,40)        
        const newContent = await ContentModel.create(doc);
        return {id:newContent._id,content:newContent}
    }
    //编辑修改帖子
    async updateContentById(id,data = {}){
        let contentObj = await Joi.validate(data,Rules.update,{stripUnknown:true})
        let oldContent = await ContentModel.findById(id)
        if(!oldContent)throw new Error(`无效的文章Id`)
        //提取内容中所有图片
        if(contentObj.comments){
            let imgs = this.getAllImgUrl(contentObj.comments)
            console.log('提取的所有图片:',imgs)
            contentObj.images = imgs
        }
        //默认选择第一张图片作为特色图
        if(contentObj.images && !contentObj.sImg){
            contentObj.sImg = contentObj.images[0]
        }
        console.log(`更新:`,contentObj)   
        contentObj = await ContentModel.findByIdAndUpdate(id,contentObj,{new:true})

        return contentObj
    }
    //

    getAllImgUrl(html){
        let cheerio = require('cheerio')
        let $ = cheerio.load(html)
        let imgUrls = []
        $('img').each((i,e)=>{
            if($(e).attr('src'))imgUrls.push($(e).attr('src'))
        })
        return imgUrls
    }
}
module.exports = new ContentService()