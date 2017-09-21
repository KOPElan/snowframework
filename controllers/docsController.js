const response = require('../lib/context');

const docsController = {
    indexAction: function (req, res) {
        response.view('/docs/index.html', res);
    },
    startAction: function (req, res) {
        response.content('hello world',response.contentType.txt,res);
    }
};


module.exports = docsController;