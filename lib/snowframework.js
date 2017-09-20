var http = require('http');
var router = require('./router');
var response = require('./response');

var snowf = {
    init: function () {

    },
    start: function (port) {
        http.createServer((reqest, respose) => {
            //过滤器对请求进行筛选
            //filters.auth(request);
            //处理请求
            router.actionHandler(reqest, respose);
        }).listen(port);
    },
    addController: function (name, handler) {
        router.add(name, handler);
    },
    defaultSetting: {
        environment: 'development',
        wwwroot: './wwwroot',
        index: 'home',
        views: './views',
        error: '/shared/error.html',
        controller: './controllers'
    }
};

exports = module.exports = function createApp() {
    snowf.init();
    return snowf;
};

exports.response = response;
exports.router = router;