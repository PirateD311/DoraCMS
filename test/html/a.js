let fs = require('fs'),
    cheerio = require('cheerio')

let html = fs.readFileSync('./aim.html'),
    $ = cheerio.load(html)
console.log($('#icontent').text())