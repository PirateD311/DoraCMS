const pageData = require('../../../server/lib/service/pageData')
describe(__filename+'',()=>{
    it('首页.',async ()=>{
        let result = await pageData.index({})
        console.log(`result:`,JSON.stringify(result,null,2))
    })
    it('书籍详情页.',async ()=>{
        let result = await pageData.bookDetail('rJozHBfdm')
        console.log(`result:`,JSON.stringify(result,null,2))
    })

    it('书籍列表页.',async ()=>{
        let result = await pageData.bookList()
        console.log(`result:`,JSON.stringify(result,null,2))
    })

    it('书籍文章页.',async ()=>{
        let result = await pageData.article('H1lBpScM-M')
        console.log(`result:`,JSON.stringify(result,null,2))
    })
})