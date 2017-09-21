const path = require('path');
const url = require('url');

const router = {
    init: function (snowfsetting) {
        this.default = snowfsetting.default;
        this.root = snowfsetting.root;
    },

    requestHandler: function (req, callback) {
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
            callback({
                'isStatic': false,
                'controller': controller,
                'action': action
            });
        } else {
            //其他请求按静态文件处理
            callback({
                'isStatic': true,
                'path': path.join(this.root, req.url)
            });
        }
    }
};

module.exports = router;