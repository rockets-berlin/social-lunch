exports.Chat = {
        io : null,
        self : this,
        start : function (port)
            {
                this.io = require('socket.io').listen(port);
                this.io.sockets.on('connection', function (socket) {

                    this.addEvents();

                });
            },
        addEvents: function(){
            socket.on('message', function(message){
                console.log(message);

                self.io.sockets.emit('chat', message);
            });
        }
    };