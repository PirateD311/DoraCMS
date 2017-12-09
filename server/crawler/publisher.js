const DBURL = 'mongodb://xiaoshuo:12liu555@139.196.113.98:3717/xiaoshuo'

const mongoose = require('mongoose');
mongoose.connect(DBURL);
const db = mongoose.connection;
const ContentModel = require('../lib/models/Content.js')

let categories = ['S1bci4rWz'],
    tags = ['SJt8XdGbG']

db.once('open', async () => {
    console.log('连接数据成功');
    let crawler = require('./novel.js')
    let list = await crawler.text('http://www.88dushu.com/xiaoshuo/69/69059/','.mulu a','.novel h1','.yd_text2')
    console.log('共计:',list.length,'\n 开始发布。。。');
    
    for(let item of list){
        await publish(item.title,item.content)
        console.log(item.title,'\t 发布成功!!!!')
    }
})

db.on('error', function (error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function () {
    console.log('数据库断开，重新连接数据库');
    // mongoose.connect(config.url, {server:{auto_reconnect:true}});
});


async function publish(title,content){
    let article = {
        "title" : title,
        "stitle" : title,
        "sortPath" : "",
        "keywords" : "",
        "author" : "",
        "discription" : content.slice(0,40),
        "comments" : content,
        "isOverhead" : false,
        "isVip" : false,
        "from" : "1",
        "likeNum" : 0,
        "commentNum" : 0,
        "clickNum" : 0,
        "isTop" : 0,
        "state" : true,
        categories,
        tags,
        "type" : "",
    }
    article = new ContentModel(article);
    await article.save();
}