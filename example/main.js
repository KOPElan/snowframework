var snowf=require('../lib/snowf');
var appsetting=require('./appsetting');

var app=snowf(appsetting.snowf);

app.addController('home',require('./controllers/homeController'));

app.start();
