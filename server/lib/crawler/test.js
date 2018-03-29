let crawlerManager = require('./crawler')
const TC =[
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
async function test(tc) {
    let task = crawlerManager.getCrawlerTask(tc.name)
    console.log(task)
    crawlerManager.executeTask(tc.name)  
    setInterval(function(){
        let task = crawlerManager.getCrawlerTask(tc.name)
        console.log('**********      ',task.opt.name,task.info)
    },4000)
}
async function test2(){
    let lists = await crawlerManager.testArticleList('http://www.biquge5200.com/38_38857/','jquery','#list a')
    console.log(lists)
    let page = await crawlerManager.testArticlePage('http://www.biquge5200.com/38_38857/16198610.html','jquery','.bookname h1','jquery','#content')
    console.log(page)
}
// test(TC[0])
// test2()
//yum install php56w.x86_64 php56w-cli.x86_64 php56w-common.x86_64 php56w-gd.x86_64 php56w-ldap.x86_64 php56w-mbstring.x86_64 php56w-mcrypt.x86_64 php56w-mysql.x86_64 php56w-pdo.x86_64