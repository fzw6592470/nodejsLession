var app = require('express')(),
    http = require('http').Server(app)
    io = require('socket.io')(http);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function( socket ){
    console.log('a user connected');
    socket.on('chat message',function( message ){
        console.log('message : %s', message);
        io.emit('chat message', message);

            setInterval(function(){
              io.emit('chat message', 'message:'+ new Date().getTime());
            },3000);
    });


//    socket.broadcast.emit('hi');

    socket.on('disconnect',function(){
        console.log('user disconnected');
    });
});

io.emit('some event',{ for : 'everyone' });

http.listen('8088',function(){
    console.log('Listening on *: 8088');
});
