var http=require('http'),
    express=require('express');
var app = new express();

var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/index", function(req,res){
    res.sendFile(__dirname+"/" + "index.html");
});

app.get("/forms", function(req,res){
    var response = {
        firstname : req.query.firstname,
        lastname : req.query.lastname
    };

    console.log(response);
    res.end(JSON.stringify(response));
});

app.post("/forms", urlencodedParser, function(req,res){
    
    var response = {
        first_name : req.body.firstname,
        last_name : req.body.lastname
    };

    console.log(response);
    res.end(JSON.stringify(response));
    
});


var server = app.listen("8088",function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("server has start at http://%s:%s",host,port);
})
