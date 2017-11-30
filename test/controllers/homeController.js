var snowf = require('../../lib/snowf');
var url = require('url');

const homeController = {
    indexAction: function (req, res) {
        var context = {
            viewbag: {
                title: 'SnowFramework',
                topic: 'Hello Snowframework!',
                content: 'A Simple nodeJS Web Framework, hello world !'
            },
            viewModel: {  
                alert: 'this is a model data'
            }
        };

        context.viewModel.isLogin = req.user != undefined;
        context.viewModel.content = context.viewModel.isLogin ? 'You are already login：' + req.user.userName : 'You are already logout!';

        //var q= url.parse(req.url,true);        

        // 实现简单的filters
        snowf.filters.allowGet(req, res);

        // 答复客户端
        res.send(snowf.actionResult.view, context);
    },

    loginAction: function (req, res) {
        var userInfo = {
            userName: 'dxsh126',
            password: '123456'
        };

        snowf.signIn(res, userInfo, true);
        res.send(snowf.actionResult.content('text/html'), '登陆成功');
    },
    logoutAction: function (req, res) {
        snowf.signOut(res);
        res.send(snowf.actionResult.content('text/html'), '登出成功');
    },
    aboutAction: function (req, res) {
        //TODO:业务逻辑                        
        res.send(snowf.actionResult.content(snowf.contentType.html), "hello content");
    },
    errorAction: function (req, res) {
        snowf.response.badRequest(416, '错误请求实例', res);
    },
}

module.exports = homeController;