
const ContentCategoryModel = require("../models").ContentCategory;
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');


class ContentCategoryService {
    constructor(){

    }
    
    async getContentCategory(data = {}){
        let {current = 1,pageSize = 10,model='full',parentId} = data
        let queryObj = {};
        if (parentId) {
            queryObj['parentId'] = parentId;
        }
        if (model === 'full') {
            pageSize = '1000'
        }

        const ContentCategories = await ContentCategoryModel.find(queryObj).sort({ sortId: 1 });
        const totalItems = await ContentCategoryModel.count(queryObj);

        return {ContentCategories,totalItems,current,pageSize}
    }

    

}

module.exports = new ContentCategoryService()