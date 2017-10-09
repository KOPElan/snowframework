var action = require('../lib/action');

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
        
        return action.view(viewModel);
    }
}

module.exports = homeController;