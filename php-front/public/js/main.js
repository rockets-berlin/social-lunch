var appCache = {};
(function(){
    console = console || {log:function(){}};

    var registrationContainer = document.getElementById('register-window');
    var chatContainer = document.getElementById('chat-window');
    var userListContainer = document.getElementById('user-list');

    //registrationContainer.style.display = 'block';
    //chatContainer.style.display = 'none';
    var LunchChat = new ChatWindow(
        new Chat(chatConfig.host, chatConfig.port, chatConfig.https),
        chatContainer
    );

    var CurrentUser = new User();

    LunchChat.enter(CurrentUser);
    LunchChat.build();

    RegistrationWindow.attach(
        document.getElementById('register'),
        document.getElementById('userId')
    ).init();


})();