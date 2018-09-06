
const ContentTagModel = require("../models").ContentTag;
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');


class ContentTagService {
    constructor(){

    }
    
    async getContentTags(data = {}){
        let {current = 1,pageSize = 10,model='full',searchkey} = data
        let queryObj = {};
        if (model === 'full') {
            pageSize = '1000'
        }
        if (searchkey) {
            let reKey = new RegExp(searchkey, 'i')
            queryObj.name = { $regex: reKey }
        }
        const contentTags = await ContentTagModel.find(queryObj).sort({ date: -1 }).skip(10 * (Number(current) - 1)).limit(Number(pageSize));
        const totalItems = await ContentTagModel.count();

        return {contentTags,totalItems,current,pageSize}
    }
}

module.exports = new ContentTagService()