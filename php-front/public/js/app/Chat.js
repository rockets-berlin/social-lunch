/**
 * Created with JetBrains PhpStorm.
 * User: alin
 * Date: 4/10/13
 * Time: 7:28 PM
 * To change this template use File | Settings | File Templates.
 */
var Chat    =   function(host, port, https){
        this.config.host = host;
        this.config.port = port;
        if(https !== undefined) {
            this.config.ssl = https;
        }
        this.getInstance = function(){
            return this;
        }
        this.emitter = null;
        this.members = [];
        this.init();
    };
Chat.prototype = {
    getInstance: function(){return this;},
    config: {
        host    :   'localhost',
        port    :   1337,
        ssl     :   false
    },
    socket  :   null,
    emitter :   new User(),

    Events  :   {
                    enter       :  'handshake',
                    authorize   :  'handshake-accept',
                    update      :  'chat',
                    talk        :  'message'
                },
    members     :   [],
    messageList :   [],
    init    :   function()
                {
                },
    enter   :   function(user, messageReceiveCallback)
                {
                    var self = this;
                    this.socket = io.connect((this.config.ssl ? 'https' : 'http') + '://'+ this.config.host + ':' + this.config.port);
                    this.socket.emit(this.Events.enter, user.getData());
                    self.setEmitter(user.getData());
                    this.socket.on(this.Events.authorize, function (users){

                        for (var i in users) {
                            self.addMember(new User(users[i]));
                        }

                        self.enable(messageReceiveCallback);

                    });

                },
    leave   :   function(callback)
                {
                    io.disconnect();
                    if(callback !== undefined && typeof callback == 'function') {
                        callback();
                    }

                },
    attachTo:   function(input, output)
                {
                    this.elements.input = input;
                    this.elements.output = output;
                },
    enable  :   function(callback)
                {
                    var self = this.getInstance();
                    this.socket.on(this.Events.update, function(message, user){
                        var currentMessage = new Message({ "message": message, "from" : user });
                        self.messageList.push(currentMessage);
                        if(callback !== undefined && typeof callback == 'function') {
                            callback(currentMessage);
                        }

                    });
                },

    talk    :   function(message)
                {
                    this.socket.emit(this.Events.talk, message, this.emitter);

                },
    setEmitter : function(user){
        this.emitter = user;
    },
    addMember : function(user){
        this.members.push(user);
    },
    getMembers : function(){
        return this.members;
    }


}