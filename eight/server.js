var express=require('express');
var app = new express();
var fs = require('fs');
var id = 2;

var user = {
    "user4" : {
        "name" : "Martin",
        "password" : "password4",
        "profession" : "teacher",
        "id" : 4,
    }
};

app.get('/listUsers', function(req, res){
    fs.readFile(__dirname+"/"+"user.json", 'utf8', function(err, data){
         console.log(data);
         res.end(data);
    });
});

app.get("/addUsers", function(req, res){
    fs.readFile(__dirname + "/"+"user.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        data['user4'] = user['user4'];
        console.log(data);
        res.end(JSON.stringify(data));
    });

});

//app.get("/:id", function(req, res){
//    fs.readFile(__dirname+"/"+"user.json", 'utf8', function(err,data){
//        console.log(data);
//        data = JSON.parse(data);
//        var user = data['user'+req.params.id];
//        console.log(user);
//        res.end(JSON.stringify(user));
//    });
//});

app.get("/deleteUsers", function(req, res){
    fs.readFile(__dirname+"/"+"user.json", "utf8", function(err,data){
        data = JSON.parse(data);
        console.log("user"+id);
        delete data['user'+id];
        console.log(data);
        res.end(JSON.stringify(data));
    });

});



var server = app.listen(8088, function(){
    
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server has started at http://%s:%s',host,port);

});
