const path = require('path');
const url = require('url');
const response = require('./response');
const appsetting = require('../appsetting');

const router = {
    controllers: appsetting.router.controllers,
    root: appsetting.router.root,
    views: appsetting.router.views,
    default: appsetting.router.default,
    pages: {},
    //映射路径与Controller
    add: function (controllerName, controllerFunc) {
        this.pages[controllerName] = controllerFunc;
    },
    actionHandler: function (req, res) {
        let requestUrl = url.parse(req.url);
        let fileName = '';

        if (path.extname(requestUrl.pathname) == '') {
            //解析/home/index
            let splitArray = requestUrl.pathname.split('/');
            //controller为空时返回appsetting中默认值
            let controller = splitArray[1] == undefined || splitArray[1] == '' ? this.default : splitArray[1];
            //action为空时返回Index
            let action = splitArray[2] == undefined || splitArray[2] == '' ? 'indexAction' : splitArray[2] + 'Action';
            //调用controller中对应的方法
            try {
                this.pages[controller][action](req, res);
            } catch (err) {
                console.log(err);
                response.error(err, res);
            }
        } else {
            //其他请求按静态文件处理
            response.file(path.join(this.root, req.url), res);
        }
    }
};

module.exports = router;