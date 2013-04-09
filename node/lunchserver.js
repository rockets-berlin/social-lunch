var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
  
  socket.on('message', function(message){
    console.log(message);
    
    io.sockets.emit('chat', message);
  });
  
});