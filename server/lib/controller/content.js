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

const {content} = require('../service')

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
        // author:Joi.string().empty(''),
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
        // if(req.session.user ||req.session.adminUserInfo){
        //         // delete queryObj.isVip;
        //         if(isVip)queryObj.isVip = true;
        // }
        try {
            let data = req.query
            let {contents,totalItems,current,pageSize} = await content.getContents(data)
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
            console.log(err)
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
            let result = await content.getContentById(targetId)
            // {content,randomArticles,totalContents,commentNum}
            res.send({
                state: 'success',
                doc: result.content || {},
                // messages,
                randomArticles:result.randomArticles
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
                try {
                    if(req.session.adminUserInfo){
                        fields.author = req.session.adminUserInfo._id
                    }else if(req.session.user){
                        files.author = req.session.user._id
                    }
    
                    let {id} = await content.addContent(fields)
                    res.send({
                        state: 'success',
                        id
                    });
                } catch (err) {
                    logUtil.error(err, req);
                    res.send({
                        state: 'error',
                        type: 'ERROR_IN_SAVE_DATA',
                        message: '保存数据失败:',
                    })
                }
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return
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