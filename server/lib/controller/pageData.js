const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const {pageDataService, contentCategoryService, contentTagService} = require('../service')

let systemData = {
    headerNavigation: [],
    contentTags: []
}

class PageDataController {
    constructor() {
        // super()
    }
    async getIndex(req,res,next){
        try{
            console.log(`body:`,req.body)
            let indexData = await pageDataService.index({})
            systemData.headerNavigation = indexData.navigation.filter(v=>v.group === 'headBar')
            res.render('index',{
                state:'success',
                indexData
            })
        }catch(error){
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR',
                message: error,
            })            
        }
    }
    async getBookDetail(req,res,next){
      try{
          console.log(`body:`,req.body)
          let detailData = await pageDataService.bookDetail(req.params.bookId)
          console.log(`bookDetailcontroller----${detailData}`);
          console.log(detailData)
          res.render('book/index',{
              state:'success',
              detailData,
              systemData
          })
      }catch(error){
          logUtil.error(error, req);
          res.send({
              state: 'error',
              type: 'ERROR',
              message: error,
          })            
      }
  }
  async getAllChapter(req,res,next){
    try{
        console.log(`body:`,req.body)
        // let detailData = await pageDataService.bookDetail(req.params.bookId)
        // console.log(`bookDetailcontroller----${detailData}`);
        let detailData = await pageDataService.bookDetail(req.params.bookId)
        console.log(`bookDetailcontroller----${detailData}`);
        res.render('book/chapter',{
            state:'success',
            detailData,
            systemData
        })
    }catch(error){
        logUtil.error(error, req);
        res.send({
            state: 'error',
            type: 'ERROR',
            message: error,
        })            
    }
}
  async getBookArticle(req,res,next){
      try{
          console.log(`body:`,req.body)
          let aricleData = await pageDataService.article(req.params.articleId)
          console.log(`controller----${aricleData}`);
          res.render('book/bookDetail',{
              state:'success',
              aricleData,
              systemData
          })
      }catch(error){
          logUtil.error(error, req);
          res.send({
              state: 'error',
              type: 'ERROR',
              message: error,
          })            
      }
  }
  async getContentCategories(req, res, next) {
      try {
          console.log(`body:`,req.body)
          let {ContentCategories,totalItems,current,pageSize} = await contentCategoryService.getContentCategory(req.query)
          console.log(`controller----${ContentCategories}`);
          res.render('bookList/cate',{
              state:'success',
              bookTypes: {
                docs: ContentCategories,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10
                },
              },
              systemData
          })
      } catch (err) {
          logUtil.error(err, req);
          res.send({
            state: 'error',
            type: 'ERROR',
            message: error,
        })   
      }
  }

  async getBookList(req,res,next){
    try{
        console.log(`body:`,req.body)
        let query = {
            categories:req.params.typeId,
            // tags:"SJt8XdGbG"
        }
        let bookList = await pageDataService.bookList(query)
        console.log(`getBookListcontroller----${bookList}`);
        res.render('bookList/index',{
            state:'success',
            bookList,
            systemData
        })
    }catch(error){
        logUtil.error(error, req);
        res.send({
            state: 'error',
            type: 'ERROR',
            message: error,
        })            
    }
  }
  async getBookListRank(req,res,next){
    try{
        // console.log(`body:`,req.body)
        // console.log(`controller----${bookList}`);
        let {contentTags,totalItems,current,pageSize} = await contentTagService.getContentTags()
        systemData.contentTags = contentTags
        let rankList = [
            {
                title:'打赏榜',
                sortId:1,
                books:[
                    {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传打赏",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      }
                ],
            },
            {
                title:'热销榜',
                sortId:2,
                books:[
                    {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "热销庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      }
                ],

            },
            {
                title:'点击榜',
                sortId:3,
                books:[
                    {
                        "_id": "Sy_wlBGO7",
                        "name": "点击传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      }
                ],

            },
            {
                title:'完本榜',
                sortId:4,
                books:[
                    {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      },
                      {
                        "_id": "Sy_wlBGO7",
                        "name": "何继庆传",
                        "author": "何二狗",
                        "craeteDate": "2018-09-09T06:40:32.509Z",
                        "__v": 0,
                        "description": "我是何二狗何二狗何二狗何二狗何二狗何二狗",
                        "images": [],
                        "star": 0,
                        "isOverhead": false,
                        "isVip": false,
                        "from": "1",
                        "likeUserIds": "",
                        "likeNum": 0,
                        "commentNum": 0,
                        "clickNum": 1,
                        "refined": false,
                        "isTop": 0,
                        "status": "pubilsh",
                        "wordNum": 0,
                        "updateDate": "2018-09-09 14:40",
                        "createDate": "2018-09-12T13:45:52.740Z",
                        "date": "2018-09-09 14:40",
                        "sImg": "/upload/images/img20180912181243.jpeg",
                        "tags": [],
                        "categories": [
                          {
                            "_id": "kzB-YhWSj",
                            "name": "欲望都市"
                          }
                        ],
                        "type": "novel",
                        "id": "Sy_wlBGO7"
                      }
                ],

            },
        ]
        let query = {
          tags:contentTags[req.params.rankId]._id
        }
       let bookList = await pageDataService.bookList(query)
        res.render('bookList/rank',{
            state:'success',
            bookList,
            systemData,
            rankId: req.params.rankId,
        })
    }catch(error){
        logUtil.error(error, req);
        res.send({
            state: 'error',
            type: 'ERROR',
            message: error,
        })            
    }
  }
}

module.exports = new PageDataController();