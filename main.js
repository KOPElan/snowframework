var http = require('http');
var router = require('./lib/router');
var appsetting = require('./appsetting.json');

//引入controllers
var homeController = require('./controllers/homeController');
var productController = require('./controllers/productController');
//配置站点页面
router.use("home",homeController);
router.use("product",productController);

http.createServer(function (reqest, respose) {
    var result = router.action(reqest, respose);
    //homeController.
    //res.writeHead(result.statusCode, { 'Content-Type': result.contentType });
    //res.end(result.document);
}).listen(appsetting.server.port);


