var mvc = require('snowframework-mvc');

const homeController = {
    indexAction: function (req) {
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

        return mvc.action.view(context);
    },
    aboutAction : function (req) {
        //TODO:业务逻辑
        return mvc.action.content('hello content', mvc.action.contentType.html);
    }
}

module.exports = homeController;