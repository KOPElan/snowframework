var fs = require('fs');
var path = require('path');
var appsetting = require('./appsetting.json');

var router = {
    root: appsetting.router.root,
    views: appsetting.router.views,
    default: appsetting.router.default,
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
    //rules:{
    //    '/':path.join(this.views, this.default)
    //},
    add:function(){        
    },
    getContentType: function (filename) {
        var exsion = filename.toLocaleLowerCase().substr(filename.lastIndexOf('.') + 1);
        var type = this.contentType[exsion];
        if (type == undefined || type == null) { type = this.contentType.txt; }
        return type;
    },
    action: function (req, res) {
        var fileName = '';

        if (req.url == '/') {
            fileName = path.join(this.views, this.default);
        } else if (req.url.endsWith('.html')) {
            fileName = path.join(this.views, req.url);
        } else if(req.url.indexOf('.')==-1){
            fileName=path.join(this.views, req.url,this.default);
        }
        else {
            fileName = path.join(this.root, req.url);
        }

        readStream(fileName, res);
    }
};

function readStream(fileName, res) {
    fs.stat(fileName, (err, stat) => {
        if (!err) {
            res.writeHead(200, { 'Content-Type': router.getContentType(fileName) });

        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            fileName = path.join(appsetting.router.views, appsetting.router.error);
        }

        var rs = fs.createReadStream(fileName);
        rs.pipe(res);
    });
}

module.exports = router;