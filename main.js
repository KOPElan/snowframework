var http = require('http');
var router = require('./lib/router');
var appsetting = require('./appsetting.json');

//引入controllers
var homeController = require('./controllers/homeController');
var productController = require('./controllers/productController');
//配置controller
router.use("home", homeController);
router.use("product", productController);

//创建服务器监听
http.createServer((reqest, respose) => {
    //过滤器对请求进行筛选
    //filters.auth(request);
    //处理请求
    router.actionHandler(reqest, respose);
}).listen(appsetting.server.port);


