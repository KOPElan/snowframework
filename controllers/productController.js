var response = require('../lib/response');

var productController = {
    indexAction: function (req, res) {        
        response.content("hellow product! \r\n" , response.contentType.txt, res);
    }
};

module.exports = productController;