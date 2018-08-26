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
var ContentSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    title: String,
    stitle: String,
    type: { type: String, default: "content" }, // 发布形式 默认为普通文档,约定 singer 为单页面文档
    categories: [{ type: String, ref: 'ContentCategory' }], //文章类别
    sortPath: String, //存储所有父节点结构
    tags: [{ type: String, ref: 'ContentTag' }], // 标签
    keywords: String,
    sImg: { type: String, default: "/upload/images/defaultImg.jpg" }, // 文章小图
    discription: String,
    date: { type: Date, default: Date.now },    //发布时间
    craeteDate: { type: Date, default: Date.now },    //创建时间
    updateDate: { type: Date, default: Date.now }, // 更新时间
    author: { type: String, ref: 'AdminUser' }, // 文档作者
    contributor: { type: String, ref: 'User' }, // 投稿人
    state: { type: Boolean, default: true },  // 是否在前台显示，默认显示
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
    hiddenContent:{type:String,default:''},
    hiddenType:{type:Number,default:0},//0:无隐藏,1:登录可见,2:回复可见

});


ContentSchema.set('toJSON', { getters: true, virtuals: true });
ContentSchema.set('toObject', { getters: true, virtuals: true });

ContentSchema.path('date').get(function (v) {
    // return moment(v).startOf('hour').fromNow();
    return moment(v).format("YYYY-MM-DD HH:mm");
});
ContentSchema.path('updateDate').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm");
});

var Content = mongoose.model("Content", ContentSchema);

module.exports = Content;

