/*!
 * snowframework
 * Copyright(c) 2017 KOPElan
 * MIT Licensed
 */

'use strict';

exports.view = function (data) {
    return {
        actionResult: 'view',
        data: data
    }
};

exports.file = function (path) {
    return {
        actionResult: 'file',
        path: path
    }
};
exports.content = function (data, contentType) {
    return {
        actionResult: 'content',
        data: data,
        contentType: contentType
    }
}

exports.contentType = {
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