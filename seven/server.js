var express = require('express');
var app = new express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/index', function(req, res){
    console.log("Cookie:" ,req.cookies);
});

app.listen(8088);


