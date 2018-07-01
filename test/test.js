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
// getIpInfo()
async function getIpInfo(){
    const rq = require('request-promise')
    let resp = await rq('http://ip.taobao.com/service/getIpInfo.php?ip=125.120.77.119')
    console.log('查询ip详情',JSON.parse(resp))
}

    function checkAreaScreen(area,screens){
        for(var i =0 ;i<screens.length;i++){
            if(area.indexOf(screens[i])>-1){
                return true;
            }
        }
        return false;
    };

    console.log(checkAreaScreen('浙江杭州',['陕西','海南','杭州']))