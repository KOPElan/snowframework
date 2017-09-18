const response = require('../lib/response');
const db = require('../lib/db');

const homeController = {
    indexAction: function (req, res) {
        //返回普通页面
        response.view('/home/index.html', res);
    },
    //数据库链接实例
    //mssql源代码及文档：https://github.com/patriksimek/node-mssql
    dataAction: function (req, res) {
        //参数
        var id = 2;
        db.query(`select * from Category where id=${id}`, (result, err) => {
            if (err != null)
                return response.error(err, res);

            response.content(JSON.stringify(result.recordset[0]), response.contentType.json, res);
        });
        response.view('/home/index.html', res);
    },
    aboutAction: function (req, res) {
        response.view('/home/about.html', res);
    }
};

module.exports = homeController;