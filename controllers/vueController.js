// 第 1 步：创建一个 Vue 实例
const renders = require('../lib/renders');
const response = require('../lib/response');


const vueController = {
    indexAction: function (req, res) {
        //第 1 步：创建vue实例
        let app = renders.createVueApp({
            data: {
                pageTitle: 'VUE服务端渲染实例',
                name: 'jim',
                sex: '16'
            },
            template: `
            <div id="app">
            <div v-on:click="alert">{{name}}</div>
            <div>{{sex}}</div>
            <div>{{abc}}</div>
            </div>`,
            methods: {
                alert: function () {
                    alert('test')
                }
            }
        });

        // 第 2 步：创建一个 renderer(使用制定模板页)
        let renderer = renders.getVueRender('index');

        // 第 3 步：将 Vue 实例渲染为 HTML
        renderer.renderToString(app, {
            pageTitle: 'VUE服务端实例'
        }, (err, html) => {
            if (err) {
                response.error(err, res);
            }
            response.content(html, response.contentType.html, res);
            // => <div data-server-rendered="true">Hello World</div>
        })
    }
};

module.exports = vueController;