var path = require('path');
var url = require('url');
var response = require('./response');
var appsetting = require('../appsetting');

var router = {
    controllers: appsetting.router.controllers,
    root: appsetting.router.root,
    views: appsetting.router.views,
    default: appsetting.router.default,
    pages: {},
    //rules:{
    //    '/':path.join(this.views, this.default)---------------------------------------------------------------------+
    //},
    use: function (controllerName, controllerFunc) {
        this.pages[controllerName] = controllerFunc;
    },
    action: function (req, res) {
        var requestUrl = url.parse(req.url);
        var fileName = '';

        if (path.extname(requestUrl.pathname) == '') {
            //解析/home/index
            var splitArray = requestUrl.pathname.split('/');
            //controller为空时返回appsetting中默认值
            var controller = splitArray[1] == undefined ? this.default : splitArray[1];
            //action为空时返回Index
            var action = splitArray[2] == undefined ? 'indexAction' : splitArray[2] + 'Action';
            //调用controller中对应的方法
            try {
                this.pages[splitArray[1]][action](req, res);
            }
            catch (err) {
                console.log('err');
                response.error(res);
            }
        } else {
            //其他请求按静态文件处理
            response.file(path.join(this.root, req.url), res);
        }
    }
};

module.exports = router;