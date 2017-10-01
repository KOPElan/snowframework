/*!
 * snowframework
 * Copyright(c) 2017 KOPElan
 * MIT Licensed
 */

'use strict';

var http = require('http');
var path = require('path');
var router = require('./router');
var context = require('./context');
var render = require('./render');

var snowf = {
    init: function (appsetting) {
        if (appsetting != undefined && appsetting != null) {
            this.setting = appsetting;
        }

        router.init(this.setting.router);
        context.init(this.setting);
    },
    start: function () {
        http.createServer((reqest, response) => {
            //过滤器对请求进行筛选
            //filters.auth(request);
            //处理请求
            router.requestHandler(reqest, function (routerData) {
                responseHandler(routerData, response);
            });

        }).listen(this.setting.port);
    },
    controllers: {},
    addController: function (name, conrollerHandler) {
        this.controllers[name] = conrollerHandler;
    },
    addFilter:function(){

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

function responseHandler(routerData, response) {
    if (routerData.isStatic) {
        context.response.file(routerData.path, response);
    } else {
        try {
            var result = snowf.controllers[routerData.controller][routerData.action](routerData.request);
            switch (result.actionResult) {
                case 'view':                    
                    let action = routerData.action.replace('Action', '.html');
                    let viewPath = path.join(snowf.setting.router.views, routerData.controller, action);
                    let layoutPath = path.join(snowf.setting.router.views, 'shared', 'main.layout.html');                    
                    render.startRender(result.data, viewPath, layoutPath,function(html){
                        context.response.content(html, 'text/html', response);
                    });                    
                    return;
                case 'file':
                    context.response.file(result.path, response);
                    return;
                case 'content':
                    context.response.content(result.data, result.contentType, response);
                    return;
                default:
                    context.response.error({
                        message: '未知返回类型'
                    }, response);
                    return;
            }
        } catch (err) {
            console.log(err);
            context.response.error(err, response);
        }
    }
}

exports = module.exports = function createApp(appsetting) {
    snowf.init(appsetting);
    return snowf;
};

exports.context = context;
exports.router = router;