var snowf=require('../lib/snowf');
var appsetting=require('./appsetting');

//初始化应用
var app=snowf(appsetting.snowf);
//添加控制器
app.addController('home',require('./controllers/homeController'));
//启动应用
app.start();
