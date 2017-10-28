const fs = require('fs');

mkdirDir(__dirname+'/../source/upload/')
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