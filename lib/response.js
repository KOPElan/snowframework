var fs = require('fs');
var path = require('path');
var appsetting = require('../appsetting');

var contentType = {
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
};

function readStream(fileName, res) {
    fs.stat(fileName, (err, stat) => {
        if (!err) {
            res.writeHead(200, { 'Content-Type': getContentType(fileName) });

        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            fileName = path.join(appsetting.router.views, appsetting.router.error);
        }

        var rs = fs.createReadStream(fileName);
        rs.pipe(res);
    });
}

function getContentType(filename) {
    try {
        var ext = path.extname(filename.toLocaleLowerCase()).substr(1);
        var type = contentType[ext];
        if (type == undefined || type == null) { type = contentType.txt; }
        return type;
    }
    catch (err) {
        console.log('获取文件扩展名时出错，异常信息：' + err.message);
        return contentType.txt;
    }
}

module.exports = {
    //返回view页面
    view: function (viewPath, response) {
        var tempPath = path.join(appsetting.router.views, viewPath);
        readStream(tempPath, response);
    },
    //返回文件
    file: function (filePath, response) {
        readStream(filePath, response);
    },
    //返回API数据
    api: function () {
    },
    //返回错误页面
    error: function (response) {
        readStream(path.join(appsetting.router.views, appsetting.router.error), response);
    }
};