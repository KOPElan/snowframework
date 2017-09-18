const response = require('../lib/response');

const homeController = {
    indexAction: function (req, res) {
        response.view('/home/index.html', res);
    },
    aboutAction: function (req, res) {
        response.view('/home/about.html', res);
    }
};

module.exports = homeController;