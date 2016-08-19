var http = require('http'), io = require('socket.io');

var server = http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.end("<h1>I'm Martin Cui</h1>");
});

server.listen(8088);

var socket = io.listen(server);

socket.on('connection',function( client ){
    client.on('message',function( event ){
        console.log('Received message from client!',event);
    });

    client.on('disconnection',function(){
        cleanInterval(interval);
        console.log('Server has disconnected');
    });
});

var interval = setInterval(function(){
    client.send('This is a message from the server!'+ new Date().getTime());
},5000);
