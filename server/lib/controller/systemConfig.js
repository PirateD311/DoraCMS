const BaseComponent = require('../prototype/baseComponent');
const SystemConfigModel = require("../models").SystemConfig;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const fs = require('fs')

function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = '非法请求，请稍后重试！';
    }
    if (!fields.siteEmailServer) {
        errMsg = '请选择系统邮箱服务器！';
    }
    if (!validatorUtil.checkPwd(fields.siteEmailPwd)) {
        errMsg = '6-12位，只能包含字母、数字和下划线!';
    }
    if (!validatorUtil.checkEmail(fields.siteEmail)) {
        errMsg = '请填写正确的邮箱!';
    }
    if (!validator.isLength(fields.siteName, 5, 30)) {
        errMsg = '请输入站点名称!';
    }
    if (!validator.isLength(fields.siteDiscription, 5, 200)) {
        errMsg = '请输入站点描述!';
    }
    if (!validator.isLength(fields.siteKeywords, 5, 100)) {
        errMsg = '请输入站点关键字!';
    }
    if (!validator.isLength(fields.registrationNo, 5, 30)) {
        errMsg = '请输入站点备案号!';
    }
    if (!validator.isLength(fields.mongodbInstallPath, 5, 100)) {
        errMsg = '请输入mongodb的bin目录!';
    }
    if (!validator.isLength(fields.databackForderPath, 5, 100)) {
        errMsg = '请输入数据备份路径!';
    }
    if (errMsg) {
        res.send({
            state: 'error',
            type: 'ERROR_PARAMS',
            message: errMsg
        })
    }
}

class SystemConfig {
    constructor() {
        // super()
    }
    async getSystemConfigs(req, res, next) {
        try {
            let model = req.query.model, files = null; // 查询模式 full/simple
            if (model === 'simple') {
                files = {
                    siteName: 1,
                    siteDomain: 1,
                    siteDiscription: 1,
                    siteKeywords: 1,
                    siteEmail: 1,
                    registrationNo: 1,
                    globalJs:1,
                    globalTips:1,
                }
            }
            const systemConfigs = await SystemConfigModel.find({}, files);
            res.send({
                state: 'success',
                docs: systemConfigs
            })
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取SystemConfigs失败'
            })
        }
    }

    async getConfigsByPower() {
        return await SystemConfigModel.find({});
    }

    async updateSystemConfig(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    state: 'error',
                    type: 'ERROR_PARAMS',
                    message: err.message
                })
                return
            }

            const systemObj = {
                siteName: fields.siteName,
                siteDomain: fields.siteDomain,
                siteDiscription: fields.siteDiscription,
                siteKeywords: fields.siteKeywords,
                siteEmailServer: fields.siteEmailServer,
                siteEmail: fields.siteEmail,
                registrationNo: fields.registrationNo,
                databackForderPath: fields.databackForderPath,
                mongodbInstallPath: fields.mongodbInstallPath,
                siteEmailPwd: service.encrypt(fields.siteEmailPwd, settings.encrypt_key),
                globalJs:fields.globalJs||'',
                globalTips:fields.globalTips||'',
            }
            const item_id = fields._id;
            console.log('新的配置信息:',systemObj)
            try {
                if (item_id) {
                    await SystemConfigModel.findOneAndUpdate({ _id: item_id }, systemObj,{runValidators:true,setDefaultsOnInsert:true});
                } else {
                    const newAdminUser = new SystemConfigModel(systemObj);
                    await newAdminUser.save();
                }

                //修改全局js
                if(systemObj.globalJs){
                    const GLOBAL_JS_PATH = __dirname + '/../../../public/configjs/global_a.js'
                    console.log('修改全局js')
                    fs.writeFileSync(GLOBAL_JS_PATH,systemObj.globalJs);
                    console.log('修改全局js成功');
                }

                res.send({
                    state: 'success'
                });
            } catch (err) {
                console.log(err)
                logUtil.error(err, req);
                res.send({
                    state: 'error',
                    type: 'ERROR_IN_SAVE_DATA',
                    message: '更新数据失败:',
                })
            }
        })

    }

}

module.exports = new SystemConfig();