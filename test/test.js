const fs = require('fs');

// mkdirDir(__dirname+'/../source/upload/')
function mkdirDir(path) {
    console.log('Path:',path);
    try{
        if(fs.existsSync(path)){
            console.log('目录已存在')
        }else{
            console.log('目录不存在');
            fs.mkdirSync(path);
        }
    }catch(error){
        console.error(error);

    }
}
getIpInfo()
async function getIpInfo(){
    const rq = require('request-promise')
    let resp = await rq('http://ip.taobao.com/service/getIpInfo.php?ip=125.120.77.119')
    console.log('查询ip详情',JSON.parse(resp))
}