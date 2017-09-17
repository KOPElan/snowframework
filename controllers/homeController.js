var response=require('../lib/response');

var homeController = {
    indexAction: function (req, res) {
        response.view('/home/index.html',res);
    }
}

module.exports = homeController;