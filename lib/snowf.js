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
var render = require('./render');
var filters = require('./filters');
var authentication = require('./authentication');
var cryptoHelper = require('./cryptoHelper');

var snowf = {
    init: function (appsetting) {
        if (appsetting != undefined && appsetting != null) {
            this.setting = appsetting;
        }

        router.init(this.setting.router);
        response.init(this.setting);
        render.init(this.setting);
        filters.init(this.setting);
        authentication.init(this.setting);

        this.response = response;
    },
    //TODO:初始化信息与setting信息不一样可能造成response的问题
    setting: {
        "environment": "development",
        "port": "8080",
        "router": {
            "default": "home",
            "error": "/shared/error.html",
            "views": "./views",
            "layout": "./views/shared",
            "root": "./wwwroot"
        },
        "useCookie": false,
        "authentication": {
            "enable": false
        }
    },
    start: function () {
        http.createServer((req, res) => {
            if (this.setting.authentication.enable && !this.setting.useCookie) {
                //console.log('ERROR:If you enable authentication, you must set userCookie as true.');    
                throw new Error('If you enable authentication, you must set userCookie as true.');
            }
            //是否启用Cookie
            if (this.setting.useCookie) {
                var Cookies = {};
                req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
                    var parts = Cookie.split('=');
                    Cookies[parts[0].trim()] = (parts[1] || '').trim();
                });

                req.cookies = Cookies;
            }
            //是否启用认证功能
            if (this.setting.authentication.enable) {
                var enc = req.cookies[this.setting.authentication.cookieName];
                if (enc != undefined && enc != null) {
                    try {
                        req.user = JSON.parse(cryptoHelper.getDecAse192(enc, 'snowframework-authentication'));
                        req.isLogin = req.user != undefined;
                    }
                    catch (err) {
                        console.log('ERROR:Reslove authentication info failed!');
                    }
                }
            }

            //重定向
            res.redirct = function (url) {
                res.writeHead(302, {
                    'Location': url
                    //add other headers here...
                });
                res.end();
            };
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
    signIn: function (res, user, isRemember) {
        authentication.signIn(res, user, isRemember);
    },
    signOut: function (res) {
        authentication.signOut(res);
    }
};

exports = module.exports = snowf;
exports.router = router;
exports.contentType = contentType;
exports.filters = filters;