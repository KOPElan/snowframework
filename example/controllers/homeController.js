var action=require('../lib/action');

const homeController = {
    indexAction: function (req) {                        
        return action.view({title:'view数据',content:'hello world'});
    }
}

module.exports = homeController;