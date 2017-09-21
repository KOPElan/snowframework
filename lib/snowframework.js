var http = require('http');
var router = require('./router');
var response = require('./context');

var defaultSetting = {
    "environment": "development",
    "port": "8080",
    "router": {
        "default": "home",
        "error": "/shared/error.html",
        "views": "./views",
        "root": "./wwwroot"
    }
};

var snowf = {
    init: function (appsetting) {
        if (appsetting == undefined || appsetting == null) {
            this.setting = defaultSetting;
        } else {
            this.setting = appsetting;
        }

        router.init(this.setting);
        response.init(this.setting);
    },
    start: function () {
        http.createServer((reqest, respose) => {
            //过滤器对请求进行筛选
            //filters.auth(request);
            //处理请求
            router.actionHandler(reqest, respose);
        }).listen(this.setting.port);
    },
    addController: function (name, handler) {
        router.add(name, handler);
    },
    set: function (key, value) {

    },
    setting: {}
};

exports = module.exports = function createApp(appsetting) {
    snowf.init(appsetting);
    return snowf;
};

exports.response = response;
exports.router = router;