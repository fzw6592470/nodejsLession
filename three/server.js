var http=require('http'),
    url=require('url'),
    fs=require('fs');

http.createServer(function (req,res){
    var pathname = url.parse(req.url,true).pathname;
    
    console.log("request for " + pathname + "Received.");

    fs.readFile(pathname.substr(1),function(err,data){
        if(err){
            console.log(err);
            res.writeHead(404,{"Content-Type":"text/html"});
        }else{
            
            res.writeHead(200,{"Content-Type" : "text/html"});

            res.write("Hello,world");
        
        }

        res.end();
    });
}).listen(8088);


console.log("Server running at http://10.1.3.122:8088");
