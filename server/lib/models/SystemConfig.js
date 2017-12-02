/**
 * Created by Administrator on 2015/4/15.
 * 数据操作记录
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;


var SystemConfigSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    date: { type: Date, default: Date.now },
    siteName: { type: String, default: '前端开发俱乐部' },
    siteDomain: { type: String, default: 'http://www.html-js.cn' },
    siteDiscription: { type: String, default: '前端开发' },
    siteKeywords: String,
    siteEmailServer: String,
    siteEmail: String,
    siteEmailPwd: String,
    registrationNo: { type: String, default: '' },
    mongodbInstallPath: String,
    databackForderPath: String,
    globalJs:{
        type:String,default:'',
        set:(jsContent)=>{
            console.log('Before:',jsContent)
            if(jsContent && jsContent.indexOf('<script>')!==0){
                jsContent = '<script>'+jsContent +'<\/script>'
            }
            console.log('After:',jsContent)
            return jsContent
        },
    },
    globalTips:{
        type:String,default:''
    },
});

SystemConfigSchema.pre('save',true,function(next,done){
    if(this.globalJs && this.globalJs.indexOf('<script>')!==0){
        this.globalJs = '<script>'+this.globalJs +'<\/script>'
    }
    console.log('After:',this.globalJs)
})

var SystemConfig = mongoose.model("SystemConfig", SystemConfigSchema);

module.exports = SystemConfig;

