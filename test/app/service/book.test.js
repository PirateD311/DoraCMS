const book = require('../../../server/lib/service/book')
describe(__filename+'',()=>{
    it.only('小说列表.',async ()=>{
        let result = await book.getBooks({})
        console.log(`result:`,result)
    })
    it('修改小说.',async ()=>{
        let result = await book.updateBook({id:'SkBeRemw7',description:'这是描述'})
        console.log(`result:`,result)
    })
    it('删除小说.',async ()=>{
        let result = await book.deleteBook({id:'SkBeRemw7'})
        console.log(`result:`,result)
    })
})