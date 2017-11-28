/*!
 * snowframework
 * Copyright(c) 2017 KOPElan
 * MIT Licensed
 */
'use strict';

var http = require('http');
var path = require('path');
var router = require('./router');
var response = require('./response');
var contentType = require('./contentType');
const render = require('./render');

var snowf = {
    init: function (appsetting) {
        if (appsetting != undefined && appsetting != null) {
            this.setting = appsetting;
        }

        router.init(this.setting.router);
        response.init(this.setting);
        render.init(this.setting);
    },
    setting: {
        "environment": "development",
        "port": "8080",
        "router": {
            "default": "home",
            "error": "/shared/error.html",
            "views": "./views",
            "layout": "./views/shared",
            "root": "./wwwroot"
        }
    },
    start: function () {
        http.createServer((req, res) => {
            //过滤器对请求进行筛选
            //filters.auth(request);
            //处理请求                        
            router.requestHandler(req, function (newReq) {
                response.handler(newReq, res, function () {
                    snowf.controllers[newReq.addInfo.controller][newReq.addInfo.action](newReq, res);
                });
            });

        }).listen(this.setting.port);

        console.log("server started at http://localhost:" + this.setting.port + "/");
    },
    controllers: {},
    addController: function (name, conrollerHandler) {
        this.controllers[name] = conrollerHandler;
    },
    addFilter: function () {

    },
    //更新配置节点
    set: function (key, value) {
        this.setting[key] = value;
    },
    actionResult: {
        'view': { type: 'view' },
        'file': { type: 'file' },
        'content': function (contenttype) {
            return { type: 'content', contentType: contenttype }
        }
    },
    contentType: contentType
};

exports = module.exports = snowf;
exports.router = router;
exports.contentType = contentType;