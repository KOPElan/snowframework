var action=require('../lib/action');

const homeController = {
    indexAction: function (req) {
        return action.view();        
        //response.view('/home/index.html', res);
    },
    aboutAction: function (req) {
        return action.content('hello world',action.contentType.html);
        //response.view('/home/about.html', res);
    }
};

module.exports = homeController;