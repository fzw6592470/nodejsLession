var express = require('express');
var app = new express();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var util = require('util');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(multer({ dest : "/tmp/" }).array('image'));

app.get("/index", function(req, res){
    res.sendFile(__dirname + '/' + 'index.html');
});

app.post("/images", function(req, res){
    console.log("文件:"+util.inspect(req.files[0],true));

    var des_file = __dirname + "/" + req.files[0].originalname;
    console.log("文件路径:"+ des_file);
    console.log("文件路径:"+req.files[0].path);

    fs.readFile( req.files[0].path, function(err,data){
        fs.writeFile(des_file,data,function(err){
            if(err){
                console.log(err);
            }else{
                response = {
                    message: "Image uploaded successfully",
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

var server = app.listen('8088', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server has started at http://%s:%s",host,port);
});

