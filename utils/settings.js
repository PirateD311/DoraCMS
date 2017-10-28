/**
 * Created by dora on 2017/5/19.
 *
 */
console.log('__dirname is ->',__dirname)
module.exports = {

    imgZip: true, // 上传图片是否压缩(如果为false则本地不需要安装gm)
    session_secret: 'pirated', // 务必修改
    auth_cookie_name: 'pirated',
    encrypt_key: 'dora',
    cache_maxAge: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //1 hours

    // 数据库配置
    URL: 'mongodb://cms:12liu555@139.196.113.98:3717/cms',
    DB: 'cms',
    HOST: '139.196.113.98',
    PORT: 3717,
    USERNAME: 'cms',
    PASSWORD: '12liu555',

    // 站点基础信息配置
    DORACMSAPI: 'http://api.html-js.cn', // 系统服务提供商
    SYSTEMLOGPATH: '/home/doraData/logsdir/doracms', // 服务器日志保存目录
    // 邮件相关设置
    email_findPsd: 'findPsd',
    email_reg_active: 'reg_active',
    email_notice_contentMsg: 'notice_contentMsg',
    email_notice_contentBug: 'notice_contentBug',
    email_notice_user_contentMsg: 'notice_user_contentMsg',
    email_notice_user_reg: 'notice_user_reg',

    // 信息提示相关
    system_illegal_param: '非法参数',
    system_noPower: '对不起，您无权执行该操作！',
    system_atLeast_one: '请选择至少一项后再执行删除操作！',
    system_batch_delete_not_allowed: '对不起，该模块不允许批量删除！',

    //上传路径
    UPLOAD_PATH: __dirname+'/../../source/upload/'
};



