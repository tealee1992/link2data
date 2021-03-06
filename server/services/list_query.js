/*functions for data query : list databases, tables, rows*/
var mysql = require('mysql')
var dbs = require("../db")
var dataFormat = require('../functions/dataformat')
var $sql = require('../sql_map');
var Promise = require('bluebird')
var connDict = dbs.connDict
var dblist = dbs.dblist
var currConn = dbs.currConn
setConn = function(dbname) {

    if(dblist.indexOf(dbname) != -1){
        //switch current connection
        currConn = connDict[dbname];
        // currConn.query("SELECT DATABASE()", function(err, result){
        //     if(err){
        //         console.log("err"+err)
        //     }else {
        //         console.log("current database"+result)
        //     }
        // })
    }
}
var query = {
    
    list_database : function(req, cb) {
        var sql = $sql.data.dbs_list;
        // var params
        // if(req.body){
        //     params = req.body;       
        // }
        var respdata = dataFormat.respFormat();
        var remove = ["information_schema","test","mysql","performance_schema","sys"];
        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("db query"+err);
                respdata.result = "db query"+err;
                respdata.msg = "fail";
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                /*[{\"Database\":\"information_schema\"},..]*/
                var temp = [];
                for (var i = result.length - 1; i >= 0; i--) {
                    var value = Object.keys(result[i]).map(function(key) {
                        return result[i][key];
                    })
                    if (remove.indexOf(value[0]) == -1) {
                        temp.push(value[0]);
                    }
                }
                respdata.result = temp;
                cb(true,respdata)
            }
        })
    },

    list_db_inf : function(req, cb) {
        
        var db_name = req.query.db;
        setConn("information_schema")
        var respdata = dataFormat.respFormat();
        var db_infor = {
            name: db_name,
            type: 'mysql',
            db_size: '',
            tb_count: '',
            row_count: '',
        }

        var sql = $sql.data.tb_count;
        var inserts = [db_name];
        var get_tb_count = new Promise(function(resolve,reject) {

            sql = mysql.format(sql, inserts);
            currConn.query(sql, function(err, result) {
                if(err) {
                    console.log("tb count query"+err)
                    respdata.result = "tb count query"+err;
                    respdata.msg = "fail";
                    cb(false,respdata)
                }else {
                    respdata.msg = 'success';
                    var value = Object.keys(result[0]).map(function(key) {
                        return result[0][key];
                    })
                    db_infor.tb_count = value[0];
                    resolve();
                }
            })

        })
        var get_row_count = new Promise(function(resolve,reject) {
            //get row count
            sql = $sql.data.db_row_count;
            sql = mysql.format(sql, inserts);
            currConn.query(sql, function(err, result) {
                if(err) {
                    console.log("db row count query"+err)
                    respdata.result = "db row count query"+err;
                    respdata.msg = "fail";
                    cb(false,respdata)
                }else {
                    respdata.msg = 'success';
                    var value = Object.keys(result[0]).map(function(key) {
                        return result[0][key];
                    })         
                    db_infor.row_count = value[0];
                    resolve();  
                }
            })
        })
        var get_db_size = new Promise(function(resolve,reject) {
            //get db size
            sql = $sql.data.db_size;
            sql = mysql.format(sql, inserts);
            currConn.query(sql, function(err, result) {
                if(err) {
                    console.log("db size query"+err)
                    respdata.result = "db size query"+err;
                    respdata.msg = "fail";
                    cb(false,respdata)
                }else {
                    respdata.msg = 'success';
                    var value = Object.keys(result[0]).map(function(key) {
                        return result[0][key];
                    })
                    db_infor.db_size = value[0];
                    resolve();
                }
            }) 
        })
        get_tb_count.then(function() {
            return get_row_count;
        }).then(function() {
            return get_db_size;
        }).then(function() {
            // console.log(JSON.stringify(db_infor))
            respdata.result = db_infor;
            cb(true,respdata)            
        })
    },
    list_table : function(req, cb) {
        var sql = $sql.data.tables_list;
        var db_name = req.query.db;
        setConn(db_name)

        respdata = dataFormat.respFormat();
        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("table query"+err)
                respdata.result = "table query"+err;
                respdata.msg = "fail"
                cb(false,respdata)
            }else {
                respdata.msg = 'success';

                /*{"Tables_in_cloudlab":"labimage","Table_type":"BASE TABLE"}*/
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
    list_row_count : function(req, cb) {
        var sql = $sql.data.tb_row_count;
        var db_name = req.query.db;
        var tb_name = req.query.table;
        setConn(db_name)

        respdata = dataFormat.respFormat();

        var inserts = [tb_name];
        sql = mysql.format(sql, inserts);

        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("tb row count query"+err)
                respdata.result = "tb row count query"+err;
                respdata.msg = "fail"
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                var value = Object.keys(result[0]).map(function(key) {
                    return result[0][key];
                })
                respdata.result = value[0];
                cb(true,respdata)            
            }
        })

    },
    list_column : function(req, cb) {
        var sql = $sql.data.columns_list;
        var db_name = req.query.db;
        var tb_name = req.query.table;
        setConn(db_name)

        respdata = dataFormat.respFormat();

        var inserts = [db_name, tb_name];
        sql = mysql.format(sql, inserts);
        currConn.query(sql, function(err, result) {
            if(err) {
                console.log("table query"+err)
                respdata.result = "table query"+err;
                respdata.msg = "fail"
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                // console.log("++"+JSON.stringify(result)+"++")
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
        setConn(db_name)
        var tb_name = req.query.table;
        var offset = parseInt(req.query.offset);
        var count = parseInt(req.query.count);


        var inserts = [tb_name, offset, count];
        sql = mysql.format(sql, inserts);
        console.log("++"+sql+"++")
        currConn.query(sql,function(err, result) {
            if(err) {
                console.log("row query"+err);
                respdata.result = "table query"+err;
                respdata.msg = "fail"
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                respdata.result = result;
                cb(true,respdata);           
            }
        })
    },
    get_structure : function(req, cb) {
        var sql = $sql.data.structure;
        var respdata = dataFormat.respFormat();
        var db_name = req.query.db;
        setConn(db_name)
        var tb_name = req.query.table;


        var inserts = [tb_name];
        sql = mysql.format(sql, inserts);
        console.log("++"+sql+"++")
        currConn.query(sql,function(err, result) {
            if(err) {
                console.log("row query"+err);
                respdata.result = "table query"+err;
                respdata.msg = "fail";
                cb(false,respdata)
            }else {
                respdata.msg = 'success';
                console.log(JSON.stringify(result))
                respdata.result = result;
                cb(true,respdata);           
            }
        })
    }, 
}

module.exports = query;