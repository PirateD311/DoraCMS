/**
 * Created by Administrator on 2015/4/15.
 * 管理员用户组对象
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var moment = require('moment')
moment.locale('zh-cn');
var shortid = require('shortid');
var ContentCategory = require('./ContentCategory');
var ContentTag = require('./ContentTag');
var AdminUser = require('./AdminUser');
var BookSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    name: String,
    author: String,
    type: { type: String, default: "novel" }, // 书籍类型，默认小说
    categories: [{ type: String, ref: 'ContentCategory' }], //书籍类别
    tags: [{ type: String, ref: 'ContentTag' }], // 标签
    keywords: String,
    sImg: { type: String, default: "/upload/images/defaultImg.jpg" }, // 书的封面图
    discription: String,
    date: { type: Date, default: Date.now },    //发布时间
    craeteDate: { type: Date, default: Date.now },    //创建时间
    updateDate: { type: Date, default: Date.now }, // 更新时间
    serialize:false,//是否连载中
    wordNum:{type:Number,default:0},//字数
    status:{type:String,default:'pubilsh'}, //publish draft pending
    isTop: { type: Number, default: 0 },  // 是否推荐，默认不推荐 0为不推荐，1为推荐
    refined:{type:Boolean,default:false},//精品
    clickNum: { type: Number, default: 1 },
    comments: String,
    commentNum: { type: Number, default: 0 }, // 评论数
    likeNum: { type: Number, default: 0 }, // 喜欢数
    likeUserIds: {type:String,default:""}, // 喜欢该文章的用户ID集合
    from: { type: String, default: '1' }, // 来源 1为原创 2为转载

    isVip:{type:Boolean,default:false},//是否为vip可见
    isOverhead:{type: Boolean,default:false},//是否置顶
    star:{type:Number,default:0,min:0,max:5},//推荐级别

    images:[String],    //内容中的所有图片资源
});


BookSchema.set('toJSON', { getters: true, virtuals: true });
BookSchema.set('toObject', { getters: true, virtuals: true });

BookSchema.path('date').get(function (v) {
    // return moment(v).startOf('hour').fromNow();
    return moment(v).format("YYYY-MM-DD HH:mm");
});
BookSchema.path('updateDate').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm");
});

var Book = mongoose.model("Book", BookSchema);

module.exports = Book;

