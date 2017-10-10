var mvc = require('snowframework-mvc');

const homeController = {
    indexAction: function (req) {
        var viewModel = {
            viewbag: {
                title: 'SnowFramework',
                topic: 'Hello Snowframework!',
                content: 'A Simple nodeJS Web Framework, hello world !'
            },
            prop:{
                content:'hello vue example!',
                alert:'this is a model data'
            }
        };
        
        return mvc.action.view(viewModel);
    }
}

module.exports = homeController;