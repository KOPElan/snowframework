var http = require('http');
var router = require('./router');
var appsetting = require('./appsetting.json');

http.createServer(function (reqest, respose) {
    var result = router.action(reqest,respose);
    //res.writeHead(result.statusCode, { 'Content-Type': result.contentType });
    //res.end(result.document);
}).listen(appsetting.server.port);


