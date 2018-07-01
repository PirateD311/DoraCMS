/**
 * Created by Administrator on 2015/4/29.
 * 系统支持功能
 */
const express = require('express');
const router = express.Router();
//阿里云oss
const co = require('co');
const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAIfGUFOv2YHvTv',
  accessKeySecret: 'i3ZIHC6AW13tfvUNf5yywh4j388CS6',
  bucket: 'coserfuli'
});


//七牛云存储
const qiniu = require("qiniu");
const proc = require("process");

const bucket = "fuli";
const accessKey = "lK9Uwp5ECyaxikp2UsHAC5UrOWBdhmZx0NoOmisI";
const secretKey = "LK8BVVbz-_8U4qdVCE4g5yOxfZ1eHCxRWNNGl0Ne";

//七牛云存储

//文件上传类
const formidable = require('formidable'),
    util = require('util'),
    fs = require('fs');

//时间格式化
const moment = require('moment');
// let gm = require('gm');
const url = require('url');
const mime = require('../../utils/mime').types;
const service = require('../../utils/service');
//站点配置
const settings = require("../../utils/settings");


router.post('/upload',async function (req, res, next) {

    //    获取传入参数
    let params = url.parse(req.url, true);
    let fileType = params.query.type;
    let fileKey = params.query.key;
    let form = new formidable.IncomingForm(),
        files = [],
        fields = [],
        docs = [];
    console.log('start upload');
    //存放目录
    let updatePath = settings.UPLOAD_PATH+'images/'||"public/upload/images/";
    let smallImgPath = "public/upload/smallimgs/";
    let newFileName = "";
    form.uploadDir = updatePath;

    form.on('field', function (field, value) {
        fields.push([field, value]);
    }).on('file', function (field, file) {
        files.push([field, file]);
        docs.push(file);
        //校验文件的合法性
        let realFileType = service.getFileMimeType(file.path);
        let contentType = mime[realFileType.fileType] || 'unknown';
        if (contentType == 'unknown') {
            res.end('typeError');
        }

        let typeKey = "others";
        let thisType = file.name.split('.')[1];
        let date = new Date();
        let ms = moment(date).format('YYYYMMDDHHmmss').toString();
        console.log('---', fileType);
        if (fileType == 'images') {
            typeKey = "img"
        }
        newFileName = typeKey + ms + "." + thisType;

        if (fileType == 'images') {
            if (realFileType.fileType == 'jpg' || realFileType.fileType == 'jpeg' || realFileType.fileType == 'png' || realFileType.fileType == 'gif') {
                fs.rename(file.path, updatePath + newFileName, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                res.end('typeError');
            }

        }

    }).on('end', async function () {

        if(0){
            let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            let options = {
            scope: bucket,
            }
            let putPolicy = new qiniu.rs.PutPolicy(options);
            let uploadToken = putPolicy.uploadToken(mac);
            let config = new qiniu.conf.Config();
            let formUploader = new qiniu.form_up.FormUploader(config);
            let putExtra = new qiniu.form_up.PutExtra();            

            let key = 'small/'+newFileName,
                localFile = updatePath + newFileName
            console.log('上传七牛:key:',key,'localFile:',localFile,'Token:',uploadToken)
            // 文件上传
            formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
                respBody, respInfo) {
                if (respErr) {
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                    console.log(respBody);
                    let imgUrl = 'http://oz7btgiar.bkt.clouddn.com/'+respBody.key
                    console.log('上传成功:url:',imgUrl)
                    res.end(imgUrl)
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                    res.end('')
                }
            });
        }else if(0){
            console.log('上传至阿里云,文件:',updatePath + newFileName)
            co(function* () {
                var result = yield client.put('small/'+newFileName, (updatePath + newFileName));
                console.log('上传成功',result);
                // res.end('/upload/images/' + newFileName);
                res.end(result.url)
            }).catch(function (err) {
                console.log(err);
            });
        }else{ //本地上传
            console.log('上传至本地.',updatePath,newFileName)
            res.end('/upload/images/' + newFileName)
        }

    });

    form.parse(req, function (err, fields, files) {
        err && console.log('formidabel error : ' + err);
        console.log('parsing done');
    });
});







module.exports = router;