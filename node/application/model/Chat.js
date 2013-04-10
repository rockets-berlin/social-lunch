exports.Chat = {
        io : null,
        User : require('./User.js').User,
        start : function (port)
            {
                var self = this;
                this.io = require('socket.io').listen(port);
                this.io.sockets.on('connection', function (socket) {

                   self.addEvents(socket);

                });
            },
        addEvents: function(socket){
            this.addLoginEvent(socket);
            this.addChatEvent(socket)


        },
        addLoginEvent: function(socket){
            var self = this;
            socket.on('handshake', function(user){
                self.User.login(user);
                socket.emit('handshake-accept', self.User.getUserList());
            });
            socket.on('logout', function(user){
                self.User.logout(user);
            });
        },
        addChatEvent: function(socket){
            var self = this;
            socket.on('message', function(message, user){
                self.io.sockets.emit('chat', message, user);
            });
        }
    };