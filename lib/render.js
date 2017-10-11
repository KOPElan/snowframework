/*!
 * snowframework
 * Copyright(c) 2017 KOPElan
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var readline = require('readline');
var path = require('path');
var os=require('os');

//配置文件
var setting = {};
//读取文件内容
function readFile(filePath) {
    var data = fs.readFileSync(filePath);
    return data.toString();
}

//读取view section
function getViewSection(viewPath) {
    return new Promise((resolve, reject) => {
        if (viewPath == undefined || viewPath == '') {
            reject(new Error('the viewPath must not be empty!'));
        }

        var section = [];

        var frs = fs.createReadStream(viewPath);
        var objReadline = readline.createInterface({
            input: frs,
        });

        var temp = {};
        var index = 0;
        var layout = '';
        objReadline.on('line', (line) => {
            //line = line.trim();
            if (line.trim() == '') {
                return;
            }

            if (index == 0) {
                index++;

                if (line.startsWith('<!--snowf-layout-')) {
                    line = line.replace('<!--snowf-layout-', '').replace('-->', '');
                    var layoutPath = line + '.layout.html';
                    layout = readFile(path.join(setting.router.layout, layoutPath));
                    console.log('read layout end');
                    return;
                } else {
                    reject(viewPath);
                    console.log('layout is null');
                }
            }

            if (line.startsWith('<!--snowf')) {
                if (temp.tag != undefined) {
                    section.push(temp);
                    temp = {};
                }
                temp.tag = line;
            } else if (line != undefined && line != '') {
                //跳过js注释代码
                if(temp.tag=='<!--snowf-script-->'&&line.startsWith('//')){
                    return;
                }
                //js代码统一加换行符
                if(line.indexOf(os.EOL)==-1){
                    line+=os.EOL;
                }
                temp.content = temp.content == undefined ? line : temp.content + line;
            }
        });

        objReadline.on('close', () => {
            section.push(temp);
            console.log('read viewSection close');

            for (let i = 0; i < section.length; i++) {
                layout = layout.replace(section[i].tag, section[i].content);
            }
            index++;
            resolve(layout);
        });
    });
}

//渲染上下文
function renderContext(html, contextData) {
    if (contextData == null || contextData == undefined) {
        return html;
    }
    var vm = `<script>var viewModel=${JSON.stringify(contextData.viewModel)};</script>`;
    html = html.replace('</head>',
        `${vm}
    </head>`);

    if (contextData.viewbag == undefined) {
        return html;
    }

    for (let i in contextData.viewbag) {
        var reg = new RegExp('\\{\\{viewbag.' + i + '\\}\\}', 'g');
        html = html.replace(reg, contextData.viewbag[i]);
    }

    return html;
}

module.exports = {
    //初始化setting
    init: function (appsetting) {
        setting = appsetting;
    },
    //开始渲染
    startRender: function (contextData, viewPath, callback) {
        getViewSection(viewPath).then(function (html) {
            callback(renderContext(html, contextData));
            console.log('render complated');
        }).catch((viewPah) => {
            callback(renderContext(readFile(viewPath), contextData));
        });
    }
}