const fs = require('fs');
const path = require('path');
//const appsetting = require('../appsetting');

//获取指定文件的content-type
function getContentType(filename) {
    try {
        let ext = path.extname(filename.toLocaleLowerCase()).substr(1);
        let type = response.contentType[ext];
        if (type == undefined || type == null) {
            type = response.contentType.txt;
        }
        return type;
    } catch (err) {
        console.log('获取文件扩展名时出错，异常信息：' + err.message);
        return response.contentType.txt;
    }
}

//读取文件流并答复客户端
function readStream(fileName, res) {
    fs.stat(fileName, (err, stat) => {
        if (!err) {
            res.writeHead(200, {
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
    });
}

function readView() {
    //TODO
}

//创建一个服务端答复信息
function createResponse(code, contentType, data, res) {
    res.writeHead(code, {
        'Content-Type': contentType
    });
    res.end(data);
}

var appsetting={};

const response = {
    init:function(snowfsetting){
        appsetting=snowfsetting;
    },
    //response content-type
    contentType: {
        'html': 'text/html',
        'css': 'text/css',
        "js": "text/javascript",
        "json": "application/json",
        'txt': 'text/plain',
        "xml": "text/xml",
        'gif': "image/gif",
        'ico': "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv"
    },
    //返回view页面
    view: function (viewPath, response) {
        let tempPath = path.join(appsetting.router.views, viewPath);
        readStream(tempPath, response);
    },
    //返回文件
    file: function (filePath, response) {
        readStream(filePath, response);
    },
    //返回自定义数据
    content: function (data, contentType, response) {
        createResponse(200, contentType, data, response);
    },
    //返回错误页面
    error: function (error, response) {
        if (appsetting.environment == 'development') {
            createResponse(500, this.contentType.txt, error.message + error.stack, response);
        } else {
            readStream(path.join(appsetting.router.views, appsetting.router.error), response);
        }
    }
};

module.exports = response;