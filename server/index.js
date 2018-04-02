/**/
const user_api = require('./api/auth');
const list_api = require('./api/list')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//
app.use(cors());

//
app.use('/auth', user_api);
app.use('/list', list_api);
app.listen(9900);
console.log('success listen at port:9900......');
