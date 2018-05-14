const BaseComponent = require('../prototype/baseComponent');
const ContentModel = require("../models").Content;
const ContentTagModel = require("../models").ContentTag;
const MessageModel = require("../models").Message;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const _ = require('lodash');
const cheerio = require('cheerio')
const Joi = require('joi')

const Rules = {
    create:Joi.object().keys({
        title:Joi.string().required().min(5).max(50),
        stitle:Joi.string().required().min(5).max(40),
        categories:Joi.array().items(Joi.string()).single(),
        tags:Joi.array(),   //need to format
        discription:Joi.string().min(5).max(100),
        comments:Joi.string().required().min(5),
        date:Joi.date().default(Date.now()),
        sImg:Joi.string(),
        author:Joi.string(),
        state:Joi.boolean().default(true),
        status:Joi.string().default('publish'),
        isTop:Joi.number().default(0),
        clickNum:Joi.number().default(1),
        form:Joi.string().default('1'),
        isVip:Joi.boolean().default(false),
        star:Joi.number().default(0).min(0).max(5),
        hiddenContent:Joi.string(),
        hiddenType:Joi.number().default(0),
        refined:Joi.boolean()
    }),
    index:Joi.object().keys({
        current:Joi.number().default(1),
        pageSize:Joi.number().default(10),
        title:Joi.string(),
        sortby:Joi.string(),
        typeId:Joi.string(),
        tagName:Joi.string(),
        searchkey:Joi.string(),
        model:Joi.string().default('normal'),
        state:Joi.boolean().default(true),
        isVip:Joi.boolean(),
        status:Joi.string().default('publish'),
        isTop:Joi.number().default(0),
    }),
    update:Joi.object().keys({
        _id:Joi.string().required(),
        title:Joi.string(),
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

function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = '非法请求，请稍后重试！';
    }
    if (!validator.isLength(fields.title, 5, 50)) {
        errMsg = '5-50个非特殊字符!';
    }
    if (!validator.isLength(fields.stitle, 5, 40)) {
        errMsg = '5-40个非特殊字符!';
    }
    if (!fields.categories) {
        errMsg = '请选择文档类别!';
    }
    if (true || !fields.tags) { //allow empty tags
        errMsg = '请选择文档标签!';
    }
    if (!validator.isLength(fields.discription, 5, 100)) {
        errMsg = '5-100个非特殊字符!';
    }
    if (!validator.isLength(fields.comments, 5)) {
        errMsg = '文档内容不得少于5个字符!';
    }
    if (errMsg) {
        res.send({
            state: 'error',
            type: 'ERROR_PARAMS',
            message: errMsg
        })
    }
}

class Content {
    constructor() {
        // super()
    }
    async getContents(req, res, next) {
        try {
            let {current,pageSize,
                sortby, //排序规则
                typeId, //分类id
                tagName, // 文章tag
                searchkey,// 搜索关键字
                model,  // 查询模式 full/normal/simple
                state,
                isVip,//只查询vip内容
                status,
                isTop,
            } = await Joi.validate(req.query,Rules.index,{stripUnknown:true})
           
            // 条件配置
            let queryObj = {
                state,status,isTop
            }, 
                sortObj = { date: -1 }, files = null;

            if(req.session.user ||req.session.adminUserInfo){
                // delete queryObj.isVip;
                if(isVip)queryObj.isVip = true;
            }

            if (sortby) {
                let pre = '-'
                if( sortby[0]==='-' || sortby[0]==='+' ){
                    pre = sortby[0]
                    sortby = sortby.substr(1)
                }
                delete sortObj.date;
                sortObj[sortby] = pre==='-'?-1:1
            }


            if (state) {
                queryObj.state = true
            }
            if(queryObj.isTop===-1)delete queryObj.isTop            
            if(queryObj.status==='all')delete queryObj.status            

            if (typeId && typeId != 'indexPage') {
                queryObj.categories = typeId;
                if(typeId === 'vip'){
                    delete queryObj.categories;
                    queryObj.isVip = true;
                }
            }

            if (tagName) {
                let targetTag = await ContentTagModel.findOne({ name: tagName });
                if (targetTag) {
                    queryObj.tags = targetTag._id;
                    // 如果有标签，则查询全部类别
                    delete queryObj.categories;
                }
            }

            if (searchkey) {
                console.log('包括关键词.',searchkey)
                let reKey = new RegExp(searchkey, 'i')
                // queryObj.comments = { $regex: reKey }
                queryObj.title = { $regex: reKey }
            }

            if (model === 'simple') {
                files = {
                    id: 1,
                    title: 1,
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
                path: 'categories',
                select: 'name defaultUrl _id'
            }, {
                path: 'tags',
                select: 'name _id'
            }]).exec();
            const totalItems = await ContentModel.count(queryObj);
            res.send({
                state: 'success',
                docs: contents,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
                }
            })
        } catch (err) {
            logUtil.error(err, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Contents失败'
            })
        }
    }

    async getAllContens(req, res, next) {
        let files = req.query.contentfiles || null;
        return await ContentModel.find({ 'state': true }, files);
    }

    async getOneContent(req, res, next) {
        try {
            let targetId = req.query.id;
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
            res.send({
                state: 'success',
                doc: content || {},
                // messages,
                randomArticles
            })
        } catch (err) {
            logUtil.error(err, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取Content失败'
            })
        }
    }

    //获得隐藏内容
    async getHiddenContent(req,res,next){
        try {
            let targetId = req.query.id;
            const content = await ContentModel.findById(targetId,{hiddenType:1,hiddenContent:1})
            //判断是否允许获取隐藏内容

            res.send({
                state: 'success',
                doc: content || {},
            })
        } catch (error) {
             logUtil.error(err, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取隐藏内容失败'
            })           
        }
    }

    async addContent(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                // checkFormData(req, res, fields);
                let doc = await Joi.validate(fields,Rules.create,{stripUnknown:true})
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return
            }
            doc.author = req.session.adminUserInfo._id
            // const groupObj = {
            //     title: fields.title,
            //     stitle: fields.stitle,
            //     type: fields.type,
            //     categories: fields.categories,
            //     sortPath: fields.sortPath,
            //     tags: fields.tags,
            //     keywords: fields.keywords,
            //     sImg: fields.sImg,
            //     author: req.session.adminUserInfo._id,
            //     state: fields.state,
            //     isTop: fields.isTop,
            //     from: fields.from,
            //     discription: fields.discription,
            //     comments: fields.comments,
            //     isVip:fields.isVip,
            //     hiddenType:fields.hiddenType,
            //     hiddenContent:fields.hiddenContent,
            // }
            //提取内容中所有图片
            if(doc.comments){
                let imgs = getAllImgUrl(doc.comments)
                console.log('提取的所有图片:',imgs)
                doc.images = imgs
            }
            //默认选择第一张图片作为特色图
            if(doc.images && !doc.sImg){
                doc.sImg = doc.images[0]
            }
            const newContent = new ContentModel(doc);
            try {
                await newContent.save();
                res.send({
                    state: 'success',
                    id: newContent._id
                });
            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '保存数据失败:',
                })
            }
        })
    }

    async updateContent(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                // checkFormData(req, res, fields);
                fields = await Joi.validate(fields,Rules.update,{stripUnknown:true})
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return
            }

            const contentObj = fields
            const item_id = fields._id;
            //提取内容中所有图片
            if(contentObj.comments){
                let imgs = getAllImgUrl(contentObj.comments)
                console.log('提取的所有图片:',imgs)
                contentObj.images = imgs
            }
            //默认选择第一张图片作为特色图
            if(contentObj.images && !contentObj.sImg){
                contentObj.sImg = contentObj.images[0]
            }
            console.log(`更新:`,contentObj)            
            try {
                await ContentModel.findOneAndUpdate({ _id: item_id }, contentObj);
                res.send({
                    state: 'success'
                });
            } catch (err) {
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '更新数据失败:',
                })
            }
        })

    }

    async delContent(req, res, next) {
        try {
            let errMsg = '';
            if (!siteFunc.checkCurrentId(req.query.ids)) {
                errMsg = '非法请求，请稍后重试！';
            }
            if (errMsg) {
                res.send({
                    state: 'error',
                    message: errMsg,
                })
            }
            await ContentModel.remove({ _id: req.query.ids });
            // 删除关联留言
            await MessageModel.remove({ 'contentId': { $in: req.query.ids } });
            res.send({
                state: 'success'
            });
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_IN_SAVE_DATA',
                message: '删除数据失败:' + err,
            })
        }
    }

    async getTuijianList(req,res,next){
        try{
            // 条件配置
            let queryObj = {tuijian:{$gt:0}}, sortObj = { tuijian: -1 }, files = null;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            const contents = await ContentModel.find(queryObj, files).sort(sortObj).populate([{
                path: 'author',
                select: 'name -_id'
            },
            {
                path: 'categories',
                select: 'name defaultUrl _id'
            }, {
                path: 'tags',
                select: 'name _id'
            }]).exec();
            const totalItems = await ContentModel.count(queryObj);
            res.send({
                state: 'success',
                docs: contents,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
                }
            })
        }catch(err){
            logUtil.error(err, req)
            console.error(err)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取TuijianList失败'
            })
        }
    }

    // 收藏
    async starContent(req,res,next){
        try {
            let contentId = req.query.id,
                uid = req.session.user?req.session.user._id:''
            console.log('cId:',contentId,'uid:',uid,'cookie:',req.cookies,'session user:',req.session.user)
            if(uid){
                let article = await ContentModel.findById(contentId,{likeUserIds:1,likeNum:1})
                if(!article)throw 'contentId错误，找不到文章'
                let likeIds = article.likeUserIds+=(uid+','), 
                    setLikeIds = [...new Set(likeIds.split(','))],
                    likeUserIds = setLikeIds.join(','),
                    likeNum = setLikeIds.length
                console.log(likeUserIds,likeNum)
                await ContentModel.findByIdAndUpdate(contentId,{likeUserIds,likeNum},{new:true})
                res.send({
                    state: 'success',
                    doc:{likeNum,likeUserIds}
                });             
            }else{
                res.send({
                    state:'error',
                    type: 'NEED_LOGIN',
                    message: '请登录',                 
                })
            }
        } catch (error) {
                console.log('错误!!!')
                console.log(error)
                res.send({
                state:'error',
                type: 'ERROR_IN_STAR',
                message: '收藏失败',                 
            })          
        }
    }
}
function getAllImgUrl(html){
    let $ = cheerio.load(html)
    let imgUrls = []
    $('img').each((i,e)=>{
        if($(e).attr('src'))imgUrls.push($(e).attr('src'))
    })
    return imgUrls
}
module.exports = new Content();