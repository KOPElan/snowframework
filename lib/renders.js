const Vue = require('vue');
const VueRender = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');

const appsetting = require('../appsetting');

const renders = {
  //Vue服务端渲染START
  createVueApp: function (context) {
    return new Vue(context);
  },
  //获取VUE渲染实例
  getVueRender: function (templateName) {
    if (templateName == null) {
      return VueRender.createRenderer();
    }

    let tpl = path.join(appsetting.router.root, 'layout', templateName + '.layout.html');

    return VueRender.createRenderer({
      template: fs.readFileSync(tpl, 'utf-8')
    });    
  }
  //Vue服务端渲染END
}

module.exports = renders;