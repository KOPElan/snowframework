var snowf = require('../../lib/snowf');

const homeController = {
    indexAction: function (req, res) {
        var context = {
            viewbag: {
                title: 'SnowFramework',
                topic: 'Hello Snowframework!',
                content: 'A Simple nodeJS Web Framework, hello world !'
            },
            viewModel: {
                content: 'hello vue example!',
                alert: 'this is a model data'
            }
        };
        // 实现简单的filters
        snowf.filters.allowGet(req, res);

        // 答复客户端
        res.send(snowf.actionResult.view, context);
    },
    aboutAction: function (req, res) {
        //TODO:业务逻辑                        
        res.send(snowf.actionResult.content(snowf.contentType.html), "hello content");
    },
    errorAction: function (req, res) {
        snowf.response.badRequest(416, '错误请求实例', res);
    }
}

module.exports = homeController;