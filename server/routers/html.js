const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { authSession, settings } = require('../../utils');
const { ContentCategory, Content, PageData } = require('../lib/controller');
const moment = require('moment');

// 主页
router.get('/', PageData.getIndex)
// 小说详情页
router.get('/book/:bookId', PageData.getBookDetail)
// 小说全部章节页面
router.get('/bookAllChapter/:bookId', PageData.getAllChapter)
// 小说章节页面
router.get('/bookDetail/:articleId', PageData.getBookArticle)
// 书库分类页面
router.get('/bookList', PageData.getContentCategories)
// 书库某类书籍（搜索关键字、搜索类型）
router.get('/bookList/type/:typeId', PageData.getBookList)
// 书籍排行榜
router.get('/bookListRank/:rankId', PageData.getBookListRank)


module.exports = router