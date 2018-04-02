/*functions for data query : list databases, tables, rows*/
var mysql = require('mysql')
var dbs = require("../db")
var dataFormat = require('../functions/dataformat')
var $sql = require('../sql_map');

var conndict = dbs.connDict
var currConn = dbs.currConn
var dblist = dbs.dblist

var query = {
    
    list_database : function(req, cb) {
        var sql = $sql.data.dbs_list;
        // var params
        // if(req.body){
        //     params = req.body;       
        // }
        var respdata = dataFormat.respFormat();
        var conn = conndict['mysql'];
        conn.query(sql, function(err, result) {
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
        console.log("++++++"+db_name)
        if(dblist.indexOf(db_name) != -1){
            //switch current connection
            currConn = conndict[db_name]; 
        }else {
            db_name = 'mysql';
            currConn = conndict[db_name];
        }

        respdata = dataFormat.respFormat();

        var inserts = [db_name];
        sql = mysql.format(sql, inserts);
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

    list_row : function(req, cb) {
        var sql = $sql.data.rows_list;
        var respdata = dataFormat.respFormat();
        //should we have a check on the req?
        var table_name = req.query.table;
        var offset = req.query.offset;
        var maxline = req.query.maxline;


        var inserts = [table_name, offset, maxline];
        sql = mysql.format(sql, inserts);

        currConn.query(sql,function(err, result) {
            if(err) {
                console.log("row query"+err);
                respdata.msg = "table query"+err;
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                console.log(">>>>>>"+result)
                console.log(">>>>>>"+JSON.stringify(result))
                respdata.result = JSON.stringify(result);
                cb(true,respdata);           
            }
        })
    }, 
}

module.exports = query;