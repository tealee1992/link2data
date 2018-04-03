/*functions for data query : list databases, tables, rows*/
var mysql = require('mysql')
var dbs = require("../db")
var dataFormat = require('../functions/dataformat')
var $sql = require('../sql_map');

// var connDict = dbs.connDict
// var dblist = dbs.dblist
var currConn = dbs.currConn

get_DB_infor = function(dbname) {
    var sql = $sql.data.
}
var query = {
    
    list_database : function(req, cb) {
        var sql = $sql.data.dbs_list;
        // var params
        // if(req.body){
        //     params = req.body;       
        // }
        var respdata = dataFormat.respFormat();
        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("db query"+err)
                respdata.msg = "table query"+err;
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                /*[{\"Database\":\"information_schema\"},..]*/
                var temp = [];
                for (var i = result.length - 1; i >= 0; i--) {
                    var value = Object.keys(result[i]).map(function(key) {
                        return result[i][key];
                    })
                    get_DB_infor(value[0]);
                    temp.push(value[0]);
                }
                respdata.result = temp;
                cb(true,respdata)
            }
        })
    },

    list_table : function(req, cb) {
        var sql = $sql.data.tables_list;
        var db_name = req.query.db;
        dbs.setConn(db_name)

        respdata = dataFormat.respFormat();
        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("table query"+err)
                respdata.msg = "table query"+err;
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                /*{"Tables_in_mysql":"columns_priv"}*/
                var temp =[];
                for (var i = result.length - 1; i >= 0; i--) {
                    var value = Object.keys(result[i]).map(function(key) {
                        return result[i][key];
                    })
                    temp.push(value[0]);
                }
                respdata.result = temp;
                cb(true,respdata)            
            }
        })

    },
    list_column : function(req, cb) {
        var sql = $sql.data.columns_list;
        var db_name = req.query.db;
        var tb_name = req.query.table;
        dbs.setConn(db_name)

        respdata = dataFormat.respFormat();

        var inserts = [db_name, tb_name];
        sql = mysql.format(sql, inserts);
        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("table query"+err)
                respdata.msg = "table query"+err;
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                console.log("++"+JSON.stringify(result)+"++")
                var temp =[];
                for (var i = result.length - 1; i >= 0; i--) {
                    var value = Object.keys(result[i]).map(function(key) {
                        return result[i][key];
                    })
                    temp.push(value[0]);
                }
                respdata.result = temp;
                cb(true,respdata)            
            }
        })

    },

    list_row : function(req, cb) {
        var sql = $sql.data.rows_list;
        var respdata = dataFormat.respFormat();
        var db_name = req.query.db;
        dbs.setConn(db_name)
        var table_name = req.query.table;
        var offset = parseInt(req.query.offset);
        var count = parseInt(req.query.count);


        var inserts = [table_name, offset, count];
        sql = mysql.format(sql, inserts);
        console.log("++"+sql+"++")
        currConn.query(sql,function(err, result) {
            if(err) {
                console.log("row query"+err);
                respdata.msg = "table query"+err;
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                console.log(">>>>>>"+JSON.stringify(result))
                respdata.result = JSON.stringify(result);
                cb(true,respdata);           
            }
        })
    }, 
}

module.exports = query;