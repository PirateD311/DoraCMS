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
let crawlerManager = require('../crawler/crawler')
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
    if (!fields.tags) {
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

class Crawler {
    constructor() {
        // super()
    }
    async getCrawlerTasks(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let sortby = req.query.sortby; //排序规则

            let tasks = await crawlerManager.listCrawlerTasks()
            res.send({
                state: 'success',
                docs: tasks,
                // pageInfo: {
                //     totalItems,
                //     current: Number(current) || 1,
                //     pageSize: Number(pageSize) || 10
                // }
            })
        } catch (err) {
            logUtil.error(err, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取爬虫列表失败'
            })
        }
    }
    async createCrawlerTask(req,res,next){
        try {
            const form = new formidable.IncomingForm();
            form.parse(req,async (err, fields, files) =>{
                try {
                    let option = fields.option
                    console.log(fields)
                    option = JSON.parse(option)
                    let task = crawlerManager.createCrawlerTask(option)
                    res.send({
                        state: 'success',
                        docs: task,
                    })                   
                } catch (error) {
                    logUtil.error(error, req)
                    res.send({
                        state: 'error',
                        type: 'ERROR_DATA',
                        message: '创建爬虫失败'
                    })                     
                }
            })

        } catch (error) {
            logUtil.error(error, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '创建爬虫失败'
            })            
        }
    }
    async getCrawlerTask(req,res,next){
        try {
            let name = req.query.name
            let task = crawlerManager.getCrawlerTask(name)
            res.send({
                state: 'success',
                doc: task,
            })
        } catch (err) {
            logUtil.error(err, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取爬虫详情失败'
            })            
        }
    }
    async execulateTask(req,res,next){
        try {
            let name = req.query.name
            console.log('任务名称:',name)
            crawlerManager.executeTask(name)
            res.send({
                state:'success',
            })
        } catch (error) {
            logUtil.error(error, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '执行爬虫任务失败'
            })              
        }
    }

    async testTask(req,res,next){
        try {
            let type = req.query.type,option = req.query.option,url = req.query.url,result
            if(['list','page'].indexOf(type)=== -1)throw '测试类型错误'
            option = JSON.parse(option)
            if(type === 'list'){
                result = await crawlerManager.testArticleList(url,option.articleUrlMatch.type,option.articleUrlMatch.value)
            }else if (type === 'page'){
                result = await crawlerManager.testArticlePage(url,
                                        option.articleTitleMatch.type,option.articleTitleMatch.value,
                                        option.articleContentMatch.type,option.articleContentMatch.value)
                
            }
            res.send({
                state:'success',
                doc:result
            })            
        } catch (error) {
            logUtil.error(error, req)
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '测试爬虫任务失败'
            })              
        }
    }
}

module.exports = new Crawler();