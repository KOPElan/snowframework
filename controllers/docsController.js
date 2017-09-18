const response = require('../lib/response');

const docsController = {
    indexAction: function (req, res) {
        response.view('/docs/index.html', res);
    }
};

module.exports = docsController;