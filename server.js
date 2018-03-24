process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'
global.NODE_ENV = isProd
//const useMicroCache = process.env.MICRO_CACHE !== 'false'
const useMicroCache = isProd

const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression')
const lurCache = require('lru-cache')
const ueditor = require("ueditor")
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { createBundleRenderer } = require('vue-server-renderer')
const config = require('./src/api/config-server')
const resolve = file => path.resolve(__dirname, file)

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const { service, settings, authSession, logUtil, siteFunc } = require('./utils');
const authUser = require('./utils/middleware/authUser');
const { AdminResource } = require('./server/lib/controller');
// 引入 api 路由
const routes = require('./server/routers/api')
const foreground = require('./server/routers/foreground')
const manage = require('./server/routers/manage');
const system = require('./server/routers/system');

const isCacheable = () => useMicroCache
const microCache = lurCache({
    max: 500,
    maxAge: 1000 * 60 * 60 * 6
})

function createRenderer(bundle, template) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, {
        template,

        // for component caching
        cache: lurCache({
            max: 1000,
            maxAge: 1000 * 60 * 60 * 6
        }),

        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),

        // recommended for performance
        runInNewContext: false
    })
}
function createUploadDir(path){
    if(!fs.existsSync(__dirname+'/../source/')){
        fs.mkdirSync(__dirname+'/../source/');
        fs.mkdirSync(__dirname+'/../source/upload');
        fs.mkdirSync(__dirname+'/../source/upload/images');
    }
    return true
}
const app = express()

// 由 html-webpack-plugin 生成
let frontend
let backend
// 创建来自 webpack 生成的服务端包
let renderer
if (isProd) {
    // 生产模式: 从 fs 创建服务器 HTML 渲染器和索引
    const bundle = require('./dist/vue-ssr-bundle.json')
    frontend = fs.readFileSync(resolve('./dist/server.html'), 'utf-8')
    renderer = createRenderer(bundle, frontend)
} else {
    // 开发模式: 设置带有热重新加载的 dev 服务器，并在文件更改时更新渲染器和索引 HTML
    require('./build/setup-dev-server')(app, (bundle, _template) => {
        frontend = _template.frontend
        backend = _template.backend
        renderer = createRenderer(bundle, frontend)
    })
}

// 设置静态文件缓存时间
const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 })

// 引用 esj 模板引擎
app.set('views', path.join(__dirname, 'dist'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

app.use(favicon('./favicon.ico'))
app.use(compression({ threshold: 0 }))
// 日志
app.use(logger('[:remote-addr] - {:remote-user} [:method] [:url] [:status] :response-time ms :res[content-length] ":referrer" ":user-agent"'));

//创建上传路径
createUploadDir(settings.UPLOAD_PATH)

// body 解析中间件
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// cookie 解析中间件
app.use(cookieParser(settings.session_secret));
// session配置
app.use(session({ //session持久化配置
    secret: settings.encrypt_key,
    // key: "kvkenskey",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1
    },
    resave: false,
    saveUninitialized: true,
    // 为了性能关闭session持久化
    // store: new MongoStore({   
    //     db: "session",
    //     host: "localhost",
    //     port: 27017,
    //     url: !isProd ? settings.URL : 'mongodb://' + settings.USERNAME + ':' + settings.PASSWORD + '@' + settings.HOST + ':' + settings.PORT + '/' + settings.DB + ''
    // })
}));
// 鉴权用户
app.use(authUser.auth);
// 初始化日志目录
logUtil.initPath();
// 设置 express 根目录
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../source')));



app.use('/server', serve('./dist/server', true))
app.use('/static', serve('./dist/static', true))
app.use('/manifest.json', serve('./manifest.json'))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
// api 路由
app.use('/', foreground);
app.use('/api', routes);
app.use('/system', system);

// 前台路由, ssr 渲染
app.get(['/', '/page/:current(\\d+)?', '/:cate1?___:typeId?/:current(\\d+)?',
    '/:cate0/:cate1?___:typeId?/:current(\\d+)?', '/search/:searchkey/:current(\\d+)?',
    '/details/:id', '/users/:userPage', '/dr-admin', '/sitemap.html', '/tag/:tagName/:page(\\d+)?'], (req, res) => {
        if (req.originalUrl === '/dr-admin' && req.session.adminlogined) {
            return res.redirect('/manage');
        }

        if (!renderer) {
            return res.end('waiting for compilation... refresh in a moment.')
        }
        const s = Date.now()

        res.setHeader("Content-Type", "text/html")
        res.setHeader("Server", serverInfo)

        const errorHandler = err => {
            if (err && err.code === 404) {
                res.status(404).end('404 | Page Not Found')
            } else {
                // Render Error Page or Redirect
                res.status(500).end('Internal Error 500')
                console.error(`error during render : ${req.url}`)
                console.error(err)
            }
        }

        const cacheable = isCacheable(req)
        console.log('缓存标志位:',cacheable)
        if (cacheable) {
            const hit = microCache.get(req.url)
            console.log('缓存值:',hit?true:false)
            if (hit) {
                if (!isProd) {
                    console.log('cache hit!')
                }
                console.log(`whole request from cache: ${Date.now() - s}ms`)
                return res.end(hit);
            }
        }

        const context = {
            title: '二次元福利社',
            description: '二次元福利社，coser福利，动漫福利',
            keywords: '二次元福利社，coser福利，动漫福利',
            url: req.url,
            cookies: req.cookies
        }
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return errorHandler(err)
            }
            res.end(html)
            if (cacheable) {
                microCache.set(req.url, html)
            }
            console.log(`whole request: ${Date.now() - s}ms`)
        })

    })

// 机器人抓取
app.get('/robots.txt', function (req, res, next) {
    let stream = fs.createReadStream(path.join(__dirname, './robots.txt'), {
        flags: 'r'
    });
    stream.pipe(res);
});

// 集成ueditor
app.use("/ueditor/ue", ueditor(path.join(__dirname, '../source'),{
    qn: {
        accessKey: 'lK9Uwp5ECyaxikp2UsHAC5UrOWBdhmZx0NoOmisI',
        secretKey: 'LK8BVVbz-_8U4qdVCE4g5yOxfZ1eHCxRWNNGl0Ne',
        bucket: 'fuli',
        uploadURL:'http://up-z2.qiniu.com',
        origin: 'http://oz7btgiar.bkt.clouddn.com'
        // origin: 'up-z2.qiniu.com'  http://oz7btgiar.bkt.clouddn.com/ueditor/images/928976605085306880.jpeg
    }
}, function (req, res, next) {
    var imgDir = '/upload/images/ueditor/' //默认上传地址为图片
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir; //默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/upload/file/ueditor/'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/upload/video/ueditor/'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //客户端发起图片列表请求
    else if (ActionType === 'listimage') {

        res.ue_list(imgDir); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }
}));

// 后台渲染
app.get('/manage', authSession, function (req, res) {
    AdminResource.getAllResource(req, res, {
        type: '0'
    }).then((manageCates) => {
        let currentCates = manageCates ? JSON.stringify(manageCates) : [];
        if (isProd) {
            res.render('admin.html', {
                title: '后台管理',
                manageCates: currentCates
            })
        } else {
            backend = backend.replace('__manageCates__', currentCates)
            res.send(backend)
        }
    })
});
app.use('/manage', manage);

//测试并打印get的接口
const qqwry = require('lib-qqwry').init();
qqwry.speed();
app.get('/test/get',async function(req,res,next){
    try{
        console.log('####################   Get请求测试   ####################');
        let client = {
            ip:getRemoteIp(req),
            time:new Date().toLocaleTimeString()
        }
        client.area = qqwry.searchIP(client.ip)
        console.log('客户端信息：',client)
        openCrossDomain(res,null,true)
        res.send(client)
    }catch(err){
        console.log('错误!',err)
    }

    function getRemoteIp(req){
        console.log(req.headers['x-real-ip']);
        console.log(req.headers['x-forwarded-for']);
        console.log(req.connection.remoteAddress);
        console.log(req.socket.remoteAddress);

        return req.headers['x-real-ip']
            ||req.headers['x-forwarded-for']
            ||req.connection.remoteAddress
            ||req.socket.remoteAddress
            ||req.connection.socket.remoteAddress;
    }
    function openCrossDomain(res,HostList,sysCall){
        if( sysCall){
            HostList = HostList || '*';
            res.header("Access-Control-Allow-Origin", HostList);
            res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
            res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
            // res.header("X-Powered-By",' 3.2.1');
            // res.header("Content-Type", "application/json;charset=utf-8");
            res.header('Access-Control-Allow-Credentials', true);
            console.log('跨域请求已开启！');
        }
    }    
});

// 404 页面
app.get('*', (req, res) => {
    res.send('HTTP STATUS: 404')
})

app.use(function (req, res, next) {
    var err = new Error(req.originalUrl + ' Not Found')
    err.status = 404
    next(err)
})

app.use(function (err, req, res) {
    if (err) logUtil.error(err, req);
    res.status(err.status || 500)
    res.send(err.message)
})

const port = process.env.PORT || config.port || 8080
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
