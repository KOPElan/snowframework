var http = require('http');
var router = require('./router');
var context = require('./context');

var snowf = {
    init: function (appsetting) {
        if (appsetting != undefined && appsetting != null) {
            this.setting = appsetting;
        }

        router.init(this.setting.router);
        //response.init(this.setting);
    },
    start: function () {
        http.createServer((reqest, respose) => {
            //过滤器对请求进行筛选
            //filters.auth(request);
            //处理请求
            router.requestHandler(reqest, function (routerData) {
                try {
                    this.controller[routerData.controller][routerData.action](reqest, respose);
                } catch (err) {
                    console.log(err);
                    context.error(err, respose);
                }
            });

        }).listen(this.setting.port);
    },
    controllers: {},
    addController: function (name, conrollerHandler) {
        this.controllers[name] = conrollerHandler;
    },
    //更新配置节点
    set: function (key, value) {
        this.setting[key] = value;
    },
    setting: {
        "environment": "development",
        "port": "8080",
        "router": {
            "default": "home",
            "error": "/shared/error.html",
            "views": "./views",
            "root": "./wwwroot"
        }
    }
};

exports = module.exports = function createApp(appsetting) {
    snowf.init(appsetting);
    return snowf;
};

exports.context = context;
exports.router = router;