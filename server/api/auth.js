/*
this api is for login and authorize
as this app is for the administrator of the databases, 
we don't actually offer the registration interface and 
hard-code admin info instead.
*/
var express = require('express');
var moment = require('moment')
var router = express.Router();
var jwt = require('jwt-simple')
var corslist = require('../functions/cors')
var user = require('../sql_map').user;
var dataFormat = require('../functions/dataformat')

const jwtTokenSecret = 'link2database'


login = function(req, cb) {
    var params = req.body;
    var respdata = dataFormat.respFormat();
    if(params.username==user.name&&params.password==user.password) {
        respdata.msg = 'success';
        var time = moment().add(1,'days').valueOf()
        respdata.token = jwt.encode({
            iss: params.username,
            exp: time
        },jwtTokenSecret);
        cb(true,respdata);
    }else {
        respdata.msg = 'fail';
        cb(false,respdata);
    }    
}

router.post('/login', (req, res, next) => {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        //设置response header
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }else {
        
    }
    
    login(req, function (success, doc) {
        if(success){
            res.send(doc)
        }else {
            //should we do something before sending the err back?
            res.send(doc)
        } 
    })


});

// isLogin
router.post('/islogin', function(req, res, next) {

    let reqOrigin = req.headers.origin
    if(corslist.isOriginAllowed(reqOrigin)) {
        //设置response header
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header("Access-Control-Allow-Credentials", 'true');
    }else {

    }
    authority(req, function (success, doc) {
        if(success){
            res.send(doc)
        }else {
            //should we do something before sending the err back?
            res.send(doc)
        } 
    })
});

authority = function (req, cb) {
    var respdata = dataFormat.respFormat();
    var params = req.body;    
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access-token']
    if (token) {
        try {
              var decoded = jwt.decode(token, jwtTokenSecret)
              if (decoded.exp <= Date.now()) {
                respdata.msg = 0;//"tocken overdue"
                cb(false, respdata)
              } else {
                    respdata.msg = 1;//"ok"
                    cb(true,respdata)    
              }
          }catch (err) {
          console.log(err)
        }
    } else {
        respdata.msg = "no token"
        cb(false, respdata)
    }
}
module.exports = router;