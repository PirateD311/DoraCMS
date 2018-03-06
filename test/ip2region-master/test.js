const im = require('immutable')
const fs = require('fs')
let libqqwry = require('lib-qqwry')
const IPDATA = fs.readFileSync('./data/ip.merge.txt','utf-8')
console.log(IPDATA.slice(0,100).split('\n'))
function formatIPData(){
    let lines = IPDATA.split('\n')
    
}

function getIpInfo(ip){

}

var qqwry = libqqwry.init()
qqwry.speed(); //启用急速模式 比不开启效率率快非常多 但多占10M左右内存;
let st = new Date().getTime()
var ip1 = qqwry.searchIP("125.120.77.149"); //查询IP信息
console.log(new Date().getTime() - st)
console.log(ip1)
// var ips = qqwry.searchIPScope("0.0.0.0","1.0.0.0");  //查询IP段信息
// //异步查询IP段信息
// qqwry.searchIPScope("0.0.0.0","1.0.0.0",function(err,iparr){
//   console.log(iparr);
// });