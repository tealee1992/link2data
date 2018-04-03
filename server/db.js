/*
we establish multi connections at the begining.
these connections are preserved by a connection map(dict) {connDict}.
*/
var mysql = require('mysql');
var database = {
    host: 'localhost',
    user: 'root',
    password: 'abcd1234!',
    database: 'mysql',
    port: '3306'
}
var dblist = new Array();
var connDict = {};
var conn=mysql.createConnection(database);
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
                database.database = dblist[i];
                console.log(":::::"+dblist[i]);
                var conn2=mysql.createConnection(database);
                conn2.connect();
                connDict[dblist[i]] = conn2;
            }
        }
    }
})

setConn = function(dbname) {

    if(dblist.indexOf(dbname) != -1){
        //switch current connection
        currConn = connDict[dbname]; 
    }
}
//current connection //it's deprecated
//var currConn = connDict['mysql']
var dbs = {
    //connDict : connDict,
    currConn : currConn,
    //dblist : dblist,
    setConn : setConn,
}

module.exports = dbs;