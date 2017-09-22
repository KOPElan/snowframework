const action = require('../lib/action');

const docsController = {
    indexAction: function (req) {
        //response.view('/docs/index.html', res);   
        return action.view();
    },
    startAction: function (req) {
        return action.file('./wwwroot/img/bk.svg');
        //response.content('hello world',response.contentType.txt,res);
    }
};


module.exports = docsController;