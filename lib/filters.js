/*!
 * snowframework
 * Copyright(c) 2017 KOPElan
 * MIT Licensed
 */

'use strict';

const response = require('./response');

//TODO：过滤器，用来过滤请求
const filters = {
    allowGet: function (req, res) {
        if (req.method != 'GET') {
            res.sendStatus = 'closed'
            response.badRequest(403, 'Forbidden', res);
        }
    },
    allowPost: function (req, res) {
        if (req.method != 'POST') { 
            res.sendStatus = 'closed'
            response.badRequest(403, 'Forbidden', res);
        }
    },
    denyGet: function (req,res) {
        if (req.method == 'GET') {
            res.sendStatus = 'closed'
            response.badRequest(403, 'Forbidden', res);
        }
    },
    denyPost: function (req,res) {
        if (req.method == 'POST') { 
            res.sendStatus = 'closed'
            response.badRequest(403, 'Forbidden', res);
        }
    }
};

module.exports = filters;