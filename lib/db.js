const sql = require('mssql');
const appsetting = require('../appsetting');

let db = {
    query: (query, callback) => {
        sql.connect(appsetting.mssql).then(pool => {            
            return pool.request().query(query);
        }).then(result => {            
            callback(result, null);
            sql.close();
        }).catch(err => {
            console.log(err.message);
            callback(null, err);
            sql.close();
        });
    }
};

module.exports = db;