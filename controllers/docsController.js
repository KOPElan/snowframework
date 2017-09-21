const action = require('../lib/action');

const docsController = {
    indexAction: function (req) {
        //response.view('/docs/index.html', res);   
        return action.view();
    },
    startAction: function (req) {
        return action.file('D:/OneDrive/图片/屏幕快照/2017-05-17 (1).png');
        //response.content('hello world',response.contentType.txt,res);
    }
};


module.exports = docsController;