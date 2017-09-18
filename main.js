const http = require('http');
const router = require('./lib/router');
const appsetting = require('./appsetting.json');

//引入controllers
const homeController = require('./controllers/homeController');
const docsController = require('./controllers/docsController');
const vueController = require('./controllers/vueController');
//配置controller
router.use('home', homeController);
router.use('docs', docsController);
router.use('vue', vueController);

//创建服务器监听
http.createServer((reqest, respose) => {
    //过滤器对请求进行筛选
    //filters.auth(request);
    //处理请求
    router.actionHandler(reqest, respose);
}).listen(appsetting.server.port);