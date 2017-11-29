
const fs = require('fs');
const path = require('path');
const contentType = require('./contentType');
const render = require('./render');

//获取指定文件的content-type
function getContentType(filename) {
    try {
        let ext = path.extname(filename.toLocaleLowerCase()).substr(1);
        let type = contentType[ext];
        if (type == undefined || type == null) {
            type = contentType.txt;
        }
        return type;
    } catch (err) {
        console.log('获取文件扩展名时出错，异常信息：' + err.message);
        return contentType.txt;
    }
}

//读取文件流并答复客户端
function readStream(code, fileName, res) {
    fs.stat(fileName, (err, stat) => {
        if (!err) {
            res.writeHead(code, {
                'Content-Type': getContentType(fileName)
            });

        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            fileName = path.join(appsetting.router.views, appsetting.router.error);
        }

        var rs = fs.createReadStream(fileName);
        rs.pipe(res);
        rs.on('end',function(){
            res.end();
        });        
    });
}

function readView(path, res) {
    //TODO
    readStream(200, path, res);
}

//创建一个服务端答复信息
function createResponse(code, contentType, data, res) {
    res.writeHead(code, {
        'Content-Type': contentType
    });
    res.end(data);
}

//返回view页面
function sendView(controller, action, res) {
    action = action.replace('Action', '.html');
    let tempPath = path.join(appsetting.router.views, controller, action);
    //readStream(200, tempPath, res);
    readView(tempPath, res);
}

//返回文件
function sendFile(filePath, res) {
    readStream(200, filePath, res);
}

//返回自定义数据
function sendContent(data, contentType, res) {
    createResponse(200, contentType, data, res);
}

//返回错误页面
function sendBadRequest(code, error, res) {
    if (appsetting.environment == 'development') {
        createResponse(code, contentType.txt, error.message + error.stack, res);
    } else {
        readStream(code, path.join(appsetting.router.views, appsetting.router.error), res);
    }
}

var appsetting = {};

var response = {
    init: function (snowfsetting) {
        appsetting = snowfsetting;
    },
    //处理回复信息
    handler: function (req, res, callback) {
        if (req.addInfo.isStatic) {
            sendFile(req.addInfo.path, res);
        } else {
            try {
                //回调response
                res.send = function (result, data) {
                    if(this.filter=='deny'){
                        return;
                    }

                    switch (result.type) {
                        case 'view':
                            let action = req.addInfo.action.replace('Action', '.html');
                            let viewPath = path.join(appsetting.router.views, req.addInfo.controller, action);
                            render.startRender(data, viewPath, function (html) {
                                sendContent(html, contentType.html, res);
                                //createResponse(200, contentType.html, html, res);
                            });
                            return;
                        case 'file':
                            sendFile(data, res);
                            return;
                        case 'content':
                            sendContent(data, result.contentType, res);
                            return;
                        default:
                            sendBadRequest(500, {
                                message: '未知返回类型'
                            }, res);
                            return;
                    }
                }
                callback(req, res);
                //snowf.controllers[req.addInfo.controller][req.addInfo.action](req, res);
            } catch (err) {
                console.log(err);
                sendBadRequest(500, err, res);
            }
        }
    },
    badRequest: function (code, error, res) {
        sendBadRequest(code, error, res);
    }
};

module.exports = response;