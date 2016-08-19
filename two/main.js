var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    util = require('util');

    http.createServer(function(req,res){
        console.log(req);
        console.log("server has started,Listenning on:8088");
    
        var post = '';

        var urls = url.parse(req.url,true);
//        for(var key in urls){
//            console.log("key:"+urls[key]);
//        }
//        console.log("urls:"+util.inspect(url,true,null,true));

        req.on('data',function(chunk){
            console.log('chunk:'+chunk);
            post += chunk;
        });

        res.writeHead(200,{"Content-Type": "text/html"});
        console.log("post:"+post);

        req.on('end',function(){
            post = querystring.parse(post);
            console.log(util.inspect(post,true,null,true));
            res.write(util.inspect(post,true,null,true));
            res.end();
        });
    }).listen(8088);

