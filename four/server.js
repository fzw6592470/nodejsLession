var express = require('express');
var url = require('url');
var util = require('util');

var app = new express();

app.get("/",function(req,res){
  res.send('Hello Martin!');
  console.log('params:'+util.inspect(req.params));
  console.log('path:'+req.path);
  console.log('hostname :'+req.hostname );
  console.log('body:'+req.body);
  console.log('protocol:'+req.protocol);
  console.log('query:'+util.inspect(req.query,true));
  console.log('route:'+util.inspect(req.route,true));
  console.log('subdomains:'+req.subdomains);
});


app.get("/index/*", function(req,res){
    var pathname = url.parse(req.url).pathname;

    console.log(url.parse(req.url).pathname);
    switch(pathname){
        case "/index/aaa":
            console.log("pathname: /index/aaa");
            res.send(pathname);
            break;
        case "/index/bbb":
            console.log("pathname: /index/bbb");
            res.send("request for :"+pathname);
            break;
        default:
            console.log("pathname: "+pathname);
            res.send("你是乱来的，不告诉你地址");
    }
    //res.send("index.html"+new Date().getTime());

    console.log("method:"+ util.inspect(req.method,true));
});

app.post("/index", function(req,res){
  res.send("index.html");
  console.log("method:"+ util.inspect(req.method,true));
})


var server = app.listen('8088',function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("访问地址是：http://%s:%s",host,port);
});
