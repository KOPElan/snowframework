var action = require('../lib/action');

const homeController = {
    indexAction: function (req) {
        var viewModel = {
            viewbag: {
                title: 'view数据',
                content: 'hello world'
            }
        };

        return action.view(viewModel);
    }
}

module.exports = homeController;