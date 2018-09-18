const rq = require('request-promise')
const charset = require('superagent-charset');
const agent = charset(require('superagent'))
const cheerio = require('cheerio')
const moment = require('moment')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const IM = require('immutable')
const DIRPATH = __dirname
const path = require('path')
let executingTasks = IM.List([])
const opt = {
    name:'默认任务',
    articleList:[],//文章来源设置
    articleUrlMatch:{type:'css',value:''},//文章网址匹配规则
}

class ArticleCrawlerTask{
    constructor(option){
        this.opt = {
            name:'默认任务',
            articleList:[],//文章来源设置
            articleUrlMatch:{type:'jquery',value:''},//文章网址匹配规则
            articleTitleMatch:{type:'jquery',value:''},
            articleContentMatch:{type:'jquery',value:''},
            reload:false
        }
        this.info = {step:'',startTime:'',stopTime:'',running:false}
        this.opt = Object.assign(this.opt,option)
        this.opt.articleList = [...IM.List(this.opt.articleList)]
        if(this.opt.articleList.length<1)throw '缺少文章来源地址'
        if(!this.opt.articleUrlMatch.value)throw '缺少文章地址匹配规则'
        if(!this.opt.articleTitleMatch.value)throw '缺少文章标题匹配规则'
        if(!this.opt.articleContentMatch.value)throw '缺少文章内容匹配规则'
        this.data = {
            name:this.opt.name,
            articleTasks:[],
            opt:this.opt,
            info:this.info
        }
        if(!option.reload){
            try{
                // let data = require('./data/'+this.opt.name+'.json')
                let data = fs.readFileSync(path.join(__dirname,'./data/'+this.opt.name+'.json'),'utf-8')
                data = JSON.parse(data)
                this.data = Object.assign(this.data,data)
                this.opt = data.opt
                console.log('继续任务成功!')
            }catch(error){
                console.log('继续任务失败!',error)
            }
        }
        this.name = this.opt.name
        this.log()
    }

    async getArticleUrlList(urls){
        let pages = [],
            box = [],
            listTasks = IM.List(this.data.articleTasks)
        console.log('listTasks:',listTasks.size)
        for(let v of urls){
            let $ = await req(v),
                task
            console.log($('title').text())
            if(this.opt.articleUrlMatch.type === 'jquery'){
                $(this.opt.articleUrlMatch.value).each((i,e)=>{
                    task = new ArticleTask($(e).attr('href'),$(e).text())
                    // console.log('task',task,'listTasks:',listTasks.first())
                    if(listTasks.find(_=>_.url === task.url)){
                        console.log(task,'已存在.')
                    }else{
                        listTasks = listTasks.push(task)
                    }
                })
            }

        }
        this.data.articleTasks = [...listTasks]
        return this.data.articleTasks
    }
    async getArticle(url){
        let $ = await req(url)
        let {articleTitleMatch,articleContentMatch} = this.opt
        
        let title = this.queryDom(articleTitleMatch,$).text(),
            content = this.queryDom(articleContentMatch,$).html()
        let replaceWords = [['\\n',''],['\t',''],['\"','"'],["\'","'"]]
        for(let i of replaceWords){
            let reg = new RegExp("["+i[0]+"]","g")
            content = content.replace(reg,i[1])
            title = title.replace(reg,i[1])
        }
        // console.log('OK!    ',title,content.substr(0,500))
        return {title,content}
    }
    async handleArticleList(){
            await this.getArticleUrlList(this.opt.articleList)
            this.log()
            console.log(this.opt.name,'待爬取文章总数:',this.data.articleTasks.length)
    }   
    async handleArticlePage(){
        let tasks = this.data.articleTasks,
            i = 0,sortId=0
        console.log('待爬取文章总数:',tasks.length)
        for(let task of tasks){
            sortId++
            if(!task.title || !task.content){
                i++
                let {title,content} = await this.getArticle(task.url)
                task.title = title
                task.content = content
                task.sortId = sortId
                task.doneTime = moment().format('YYYY-MM-DD hh:mm:ss')
                this.log()
            }
        }
        this.log()
        console.log('全部抓取完成')
    }
    async execute(){
        try{
            this.info.step = '处理文章列表'
            this.info.running = true
            this.info.startTime = moment().format('YYYY-MM-DD HH:mm:ss')
            await this.handleArticleList()
            console.log('获得列表成功...')
            this.info.step = '处理文章页'
            await this.handleArticlePage()   
            console.log('获得全部文章详情成功...') 
            this.info.stopTime = moment().format('YYYY-MM-DD HH:mm:ss')
            this.info.running = false
        }catch(error){
            this.info.running = false
            this.info.step = 'error'
            this.info.stopTime = moment().format('YYYY-MM-DD HH:mm:ss')  
        }
    }
    queryDom(match,$){
        if(match.type === 'jquery'){
            return $(match.value)
        }
    }
    log(){
        this.data.info = this.info
        let fileName = DIRPATH+'/data/'+this.opt.name+'.json'
        let tasks = this.data.articleTasks,
            doneTasks = tasks.filter(v=>v.url && v.content && v.title),
            doneCount = doneTasks.length,
            ratio = parseInt(doneCount/tasks.size*10000)/100||0
        console.log('--------------  当前进度【 %d% 】---- [总数 %d ][已完成 %d] [待完成 %d]',ratio,tasks.size,doneCount,tasks.size-doneCount)
        let temp = require(fileName)

        fs.writeFileSync(DIRPATH+'/data/'+this.opt.name+'.json',JSON.stringify(this.data,null,2))
        
    }
}

class ArticleTask{
    constructor(url,lable){
        this.url = url
        this.lable = lable
        this.title
        this.content

    }
}

async function req(url){
    let type = 'jsdom',
        $ = null,
        dom = "",
        stTime = new Date().getTime()
        
    if(type === 'jsdom'){
        dom = (await JSDOM.fromURL(url)).serialize();
    }else if(type === 'superagent'){
        dom = (await agent.get(url).charset('utf-8')).text
    }
    $ = cheerio.load(dom,{decodeEntities:false})
    // console.log('##########    --->请求耗时<---   ',new Date().getTime()-stTime,'ms')
    await sleep(1)
    return $
}
async function sleep(sec){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },sec*1000)
    })
}

module.exports.createCrawlerTask = function(option){
    return new ArticleCrawlerTask(option)
}
module.exports.listCrawlerTasks = function(){
    let tasks = fs.readdirSync(DIRPATH+'/data')
    console.log('任务列表:',tasks)
    tasks = tasks.filter(v=>v[0]!=='.').map(v=>{
        try {
            let task = JSON.parse(fs.readFileSync(path.join(DIRPATH,'./data/'+v))),
                listArticle = IM.List(task.articleTasks),
                doneCount = listArticle.count(_=>_.title&&_.content),
                ratio = parseInt(doneCount/listArticle.size*10000)/100
            return {
                name:task.name,
                articleCount:listArticle.size,
                doneCount,
                ratio,
            }
        } catch (error) {
            return {name:v}
        }
    })
    return tasks
}
module.exports.getCrawlerTask = getCrawlerTask
function getCrawlerTask(name){
    try {
        console.log('当前执行的任务数:',executingTasks.size)
        let task = executingTasks.find(v=>v.name === name)
        if(task){
            console.log('任务正在执行中...')
            console.log('任务信息:',task.name,task.opt,task.info)
            return task;
        }else{
            task = require(DIRPATH+'/data/'+name+'.json')
            console.log('任务信息:',task.name,task.opt)
            return new ArticleCrawlerTask(task.opt)
        }
    } catch (error) {
        console.log('获取失败...',error)
        throw error;
    }
}
module.exports.executeTask = executeTask
async function executeTask(name){
    try{
        console.log('当前执行的任务数:',executingTasks.size)
        let task = executingTasks.find(v=>v.opt.name === name)
        if(task){
            console.log('当前任务已处于执行中.')
            return task
        }else{
            task = getCrawlerTask(name)
            try {
                executingTasks = executingTasks.push(task)
                await task.execute()
                let index = executingTasks.findIndex(v=>v.name === name)
                executingTasks = executingTasks.delete(index)
            } catch (error) {
                console.log('任务:',name,'执行出错:',error)
                let index = executingTasks.findIndex(v=>v.name === name)
                executingTasks = executingTasks.delete(index)
                return task
            }
        }
    }catch(error){
        console.log('执行任务失败!',error)
        throw error
    }
}
module.exports.testArticleList = testArticleList
async function testArticleList(url,matchType='jquery',matchValue){
    try {
        let $ = await req(url),urlsMap = {}
        console.log($('title').text())
        if(matchType === 'jquery'){
            $(matchValue).each((i,e)=>{
                task = new ArticleTask($(e).attr('href'),$(e).text())
                urlsMap[task.url] = task
            })
        }
        return Object.values(urlsMap)
    } catch (error) {
        console.log('Error:',error)
        throw error
    }
}
module.exports.testArticlePage = testArticlePage
async function testArticlePage(url,titleMatchType='jquery',titleMatchValue,contentMatchType,contentMatchValue){
    let $ = await req(url),title,content
    if(titleMatchType === 'jquery')title = $(titleMatchValue).text()
    if(contentMatchType === 'jquery')content = $(contentMatchValue).html()
    let replaceWords = [['\\n',''],['\t',''],['\"','"'],["\'","'"]]
    for(let i of replaceWords){
        let reg = new RegExp("["+i[0]+"]","g")
        content = content.replace(reg,i[1])
        title = title.replace(reg,i[1])
    }
    return {title,content}
}


async function test(){ 
    try {
        let test = [
            {   
                articleList:['http://www.biquge5200.com/52_52542/'],
                name:'小说爬虫',
                articleUrlMatch:{type:'jquery',value:'#list a'},
                articleTitleMatch:{type:'jquery',value:'.bookname h1'},
                articleContentMatch:{type:'jquery',value:'#content'},
            },
            {   
                articleList:['https://www.zhainanfulishe.net/nvshen'],
                name:'宅男女神',
                articleUrlMatch:{type:'jquery',value:'.home-blog-entry-text h3 a'},
                articleTitleMatch:{type:'jquery',value:'#breadcrumbs h1'},
                articleContentMatch:{type:'jquery',value:'.single-text'},
            },           
        ]
        let tasks = fs.readdirSync(DIRPATH+'/data')
        console.log('任务列表:',tasks)
        let task = new ArticleCrawlerTask(test[0])
        executeTask(test[0].name)  
    } catch (error) {
        console.log(error)
    }
}
// test()
