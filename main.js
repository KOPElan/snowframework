const appsetting = require('./appsetting.json');
const snowf = require('./lib/snowframework');

var app = snowf();

app.addController('home', require('./controllers/homeController'));

app.start(8080);


