var response=require('../lib/response');

var homeController = {
    indexAction: function (req, res) {
        response.view('/index.html',res);
    },

    testAction: function (req, res) {

    }
}

module.exports = homeController;