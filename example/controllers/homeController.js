var action = require('../lib/action');

const homeController = {
    indexAction: function (req) {
        var viewModel = {
            viewbag: {
                title: 'SnowFramework',
                topic: 'Hello Snowframework!',
                content: 'A Simple nodeJS Web Framework, hello world !'
            }
        };
        
        return action.view(viewModel);
    }
}

module.exports = homeController;