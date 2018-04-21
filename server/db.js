/*
we establish multi connections at the begining.
these connections are preserved by a connection map(dict) {connDict}.
*/
var mysql = require('mysql');
// var database = {
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'abcd1234!',
//     database: 'mysql',
//     port: '3306'
// }
var database = {
    connectionLimit: 10,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    host: '118.25.40.81',
    user: 'datastore',
    password: 'datastore',
    database: 'mysql',
    port: '13306'
}

var dblist = new Array();
var connDict = {};
var conn=mysql.createConnection(database);
conn.connect();

connDict['mysql']=conn;
conn.query("show databases", function(err, result){
    if (err) {
        console.log(err);
    }else {
        for (var i = result.length - 1; i >= 0; i--) {
            var db = result[i].Database;
            dblist.push(db); 
        }
        for (var i = dblist.length - 1; i >= 0; i--) {
            if (dblist[i] != 'mysql') {
                database.database = dblist[i];
                console.log(":::::"+dblist[i]);
                var conn2=mysql.createConnection(database);
                conn2.connect();
                connDict[dblist[i]] = conn2;
            }
        }
    }
})
for (var i =dblist.length-1; i>=0; i--) {
    connDict[dblist[i]].on('error', function(err){
        console.log("connDict"+err.code)
        if(err.code === 'ETIMEDOUT'){
            console.log("reconnect---"+dblist[i])
            connDict[dblist[i]].connect();
        }
    });
}
setConn = function(dbname) {

    if(dblist.indexOf(dbname) != -1){
        //switch current connection
        currConn = connDict[dbname];
        currConn.query("SELECT DATABASE()", function(err, result){
            if(err){
                console.log("err"+err)
            }else {
                console.log("current database"+result)
            }
        })
    }
}
//current connection //it's deprecated
var currConn = connDict['mysql']
var dbs = {
    connDict : connDict,
    currConn : currConn,
    dblist : dblist,
    setConn : setConn,
}

module.exports = dbs;