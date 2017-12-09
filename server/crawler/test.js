var articles = require('./articles.json')
console.log(articles[0])
console.log(articles[0].content.replace(/\/n/g,'<br>'))