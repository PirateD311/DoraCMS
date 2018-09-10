
const statistic = require('../../../server/lib/service/statistics')
describe(__filename+' test cases',()=>{
    it('用户统计',async ()=>{
        let input = {}
        let result = await statistic.statRecentSignUsers(input)
        console.log(`Result ==> `,result)
    })  
    it('文章统计',async ()=>{
        let input = {}
        let result = await statistic.statRecentContents(input)
        console.log(`Result ==> `,result)
    })  
})