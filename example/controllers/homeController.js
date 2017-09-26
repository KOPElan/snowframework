var action=require('../../node_modules/snowframework-action');

const homeController = {
    indexAction: function (req) {
        return action.view();
    }
}

module.exports = homeController;