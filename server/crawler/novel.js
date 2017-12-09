let rq = require('request-promise'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    iconv = require('iconv-lite')

const RQ_OPTION = {
    gzip:true,
    encoding : null,
    headers:{
        'Transfer-Encoding':'chunked',
        'Content-Type':'text/html'
    }
}
let gArticles = []


async function getAllUrls(url,jqSlt){
    let html = await rq(Object.assign({},RQ_OPTION,{url})),
        $ = cheerio.load(iconv.decode(html, 'gbk'))
    
    let urls = $(jqSlt).map((i,item)=>url+$(item).attr('href')).get()

    console.log(urls)
    fs.writeFileSync('urls.json',JSON.stringify(urls,null,2))
    return urls
}

async function handlePage(url,titleJqSlt,contentJqSlt){
    let html = await rq(Object.assign({},RQ_OPTION,{url})),
    $ = cheerio.load(iconv.decode(html, 'gbk'))

    let title = $(titleJqSlt).text(),
        content = $(contentJqSlt).html()
    
    console.log(title,'\n',content.slice(0,20))
    
    gArticles.push({
        title,content,
    })
    
}
module.exports.text = text
async function text(startUrl,articleUrlJqSlt,titleJqSlt,contentJqSlt){
    let urls = await getAllUrls(startUrl,articleUrlJqSlt)
    for(let url of urls){
        await handlePage(url,titleJqSlt,contentJqSlt)
    }
    fs.writeFileSync('articles.json',JSON.stringify(gArticles,null,2))
    return gArticles;
}
text('http://www.88dushu.com/xiaoshuo/71/71734/','.mulu a','.novel h1','.yd_text2')