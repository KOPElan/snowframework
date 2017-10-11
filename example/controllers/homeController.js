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
    }
}

module.exports = homeController;