const appsetting = require('./appsetting');
const snowf = require('./lib/snowframework');

//使用配置文件初始化应用
var app = snowf(appsetting.snowf);
//添加controller
app.addController('home', require('./controllers/homeController'));
app.addController('docs', require('./controllers/docsController'));
//开始监听
app.start();