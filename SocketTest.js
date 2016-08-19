var http = require('http'),
    server = http.createServer(function(req, res){
        res.writeHead('200',{ "Content-Type" : "text/html" });
        res.end("<h1>Hello Martin Cui.</h1>");
    }),
    io = require('socket.io')(server);
    server.listen('8080', function(){
        console.log('Listening on *: 8080');
    });


    io.on('connection', function( socket ){

        console.log('user connected');

        socket.emit('news', { hello : 'world' });
        socket.on('my other event', function( message ){
            io.emit('haha', 'Thank you used websocket.');
            console.log('message');
        }); 
    
    });

    io.on('disconnect', function(){
        console.log('user disconnected!');
    });

    io.on('error', function(err){
        console.log('error:' + err);
    });
