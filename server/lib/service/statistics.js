
const {User,Content} = require('../models')
const moment = require('moment')
class StatisticsService {

    //统计最近用户相关.
    async statRecentSignUsers(data = {}){
        let stat = {
            total:0,last7day:[],
        }
        stat.total = await User.count()
        let qryLast7day = {
            date:{$lte:moment().toISOString(),$gte:moment().subtract(7,'days').toISOString(),}
        }
        let last7dayUsers = await User.find(qryLast7day,{userName:1,date:1,})
        for(let i = 0;i<7;i++){
            let date = moment().subtract(i,'day').format('MM-DD'),
                users = last7dayUsers.filter(v=>moment(v.date).format('MM-DD')===date)
            stat.last7day.push({
                date,users,count:users.length
            })
        }
        stat.last7day = stat.last7day.reverse()
        return stat
    }
    //统计最近文章发布的数目
    async statRecentContents(data={}){
        const LAST_DAY = 7
        let stat = {total:0,last7day:[]}
        stat.total = await Content.count()
        let qryLast7day ={
            status:"publish",
            date:{$lte:moment().toISOString(),$gte:moment().subtract(LAST_DAY,'days').toISOString(),}
        }
        let last7daydocs = await Content.find(qryLast7day,{likeNum:1,clickNum:1,date:1})
        console.log(`docs`,last7daydocs)
        for(let i = 0;i<LAST_DAY;i++){
            let date = moment().subtract(i,'day').format('MM-DD'),
                docs = last7daydocs.filter(v=>moment(v.date).format('MM-DD')===date)
            console.log(date,`  => docs:`,docs)
            stat.last7day.push({
                date,docs,count:docs.length
            })
        }
        stat.last7day = stat.last7day.reverse()
        return stat
    }
}
module.exports = new StatisticsService()