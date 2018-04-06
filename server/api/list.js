/*
register the api routers for list databases, tables and rows
api: {
    "dbs": "/list/databases",
    "tables": "/list/tables?db=mysql",
    "rows": "/list/rows?table=user",
}
*/
var express = require('express');
var router = express.Router();
var corslist = require('../functions/cors')

var query = require('../services/list_query')

// var jsonWrite = function(res, ret) {
//     if(typeof ret === 'undefined') {
//         res.send('err')
//     } else {
//         res.json(ret);
//     }
// };

router.get('/databases', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }else {
        //the request origin is not in the cors list
    }

    query.list_database(req, function(success, doc) {
        if(success){
            res.send(doc)
        }else {
            //should we do something before sending the err back?
            res.send(doc)
        }  
    })
})

router.get('/dbinfor', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }else {
        //the request origin is not in the cors list
    }

    query.list_db_inf(req, function(success, doc) {
        if(success){
            res.send(doc)
        }else {
            //should we do something before sending the err back?
            res.send(doc)
        }  
    })
})

router.get('/tables', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }

    query.list_table(req, function(success, doc) {
        if(success){
            res.send(doc)
        }else {
            res.send(doc)
        }  
    })
})

router.get('/rowcount', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }

    query.list_row_count(req, function(success, doc) {
        if(success){
            res.send(doc)
        }else {
            res.send(doc)
        }  
    })
})

router.get('/rows', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }

    query.list_row(req, function(success, doc) {
        if(success){
            res.send(doc)
        }else {
            res.send(doc)
        }  
    })
})

router.get('/columns', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }

    query.list_column(req, function(success, doc) {
        if(success){
            res.send(doc)
        }else {
            res.send(doc)
        }  
    })
})
module.exports = router;