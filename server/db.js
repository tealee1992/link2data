/*
we establish multi connections at the begining.
these connections are preserved by a connection map(dict) {connDict}.
*/
var mysql = require('mysql');
var database = {
    host: 'localhost',
    user: 'root',
    password: 'abcd1234!',
    dbname: 'mysql',
    port: '3306'
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
            dblist.push(result[i].Database);
        }
        for (var i = dblist.length - 1; i >= 0; i--) {
            if (dblist[i] != 'mysql') {
                database.dbname = dblist[i];
                console.log(":::::"+dblist[i]);
                var conn=mysql.createConnection(database);
                conn.connect();
                connDict[dblist[i]] = conn;
            }
        }
    }
})

//current connection
var currConn = connDict['mysql']
var dbs = {
    connDict : connDict,
    currConn : currConn,
    dblist : dblist,
}

module.exports = dbs;