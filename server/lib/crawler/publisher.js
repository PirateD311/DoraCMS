const fs = require('fs')
const path = require('path')
// const {Content,ContentCategory,ContentTag} = require('../models')
const contentService = require('../service').content

const T_KEY = 'title'
const C_KEY = 'content'
const S_KEY = 'sortId'

async function doPublish(taskName,categories,tags,bookId){
    let task = JSON.parse(fs.readFileSync(path.join(__dirname,'data',taskName+'.json'))),
        doneUrls = task.articleTasks.filter(v=>v.content)
    console.log(`任务${ taskName },总Url数:`,task.articleTasks.length,'已完成:',doneUrls.length)
    if(!categories || !bookId)return
    for(let item of doneUrls){
        let doc = {title:item.title,comments:item.content,
            sortId:item.sortId||1,fromUrl:item.url}
        doc = Object.assign(doc,{
            categories,tags,bookId,date:new Date()
        })
        let {content} = await contentService.addContent(doc,true)
        console.log(`标题:`,content.title,`Url:`,content.fromUrl,'更新成功。')
    }
}
setTimeout(function(){
    doPublish('宅图库',['kzB-YhWSj',],['DSiesmUvI'],'M8xiRGJKe')
},2000)






