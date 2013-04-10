<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>lunch roulette!</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">


        <link rel="stylesheet" href="css/bootstrap.min.css">

        <script src="js/vendor/modernizr-2.6.2.min.js"></script>

    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>Lunch roulette yo!</p>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script src="js/vendor/socket.io.js"></script>
        <scrip
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <!--
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
        -->
        <br/>
        <div id="register-window" style="display:none">
            <form id="register">
                <label for="userId">Please register:</label>
                <input type="text" id="userId" name = "uid" />
                <input type="submit" class="btn-success" />
            </form>
        </div>

        <div id="chat-window" style="display:none">
        <textarea id="chatTextarea" cols="50" rows = "10"></textarea>
        <div id ="userList" style="float:right; width: 200px; border: solid 1px;">
            <h2>Users</h2>
        </div>
        <form id="chat">
            <input id = "myinput" type="text"/><input type="submit" class="btn-primary"/>
        </form>
        </div>
        <script>
                var User = false;
                $("#register-window").show();
                $("#chat-window").hide();

                $("#register").submit(function(event){
                    event.preventDefault();
                    startChat(this.elements);
                    return false;

                });
                startChat = function (elements) {
                    var socket = io.connect('http://<?php $_SERVER['SERVER_NAME'];?>:1337');
                    socket.emit('handshake', elements['uid'].value);
                    socket.on('handshake-accept', function (users){
                                $("#register-window").hide();
                                    $("#chat-window").show();
                                    User = elements['uid'].value;
                                    var list = document.getElementById('userList');
                                    for(var i in users){
                                        list.innerHTML += users[i] + "<br/>";
                                    }
                    });
                    var source = document.getElementById('myinput');
                    var form = document.getElementById('chat');
                    socket.on('chat', function(message, user){
                        document.getElementById('chatTextarea'). innerHTML += user + ': ' + message + '\n';

                    });

                    $("#chat").submit(function(event){
                    event.preventDefault();
                                socket.emit('message', source.value, User);
                                source.value = '';
                                return false;
                            });
                }

                window.beforeunload = function(){
                    console.log('asd');
                    socket.emit('logout', User);
                    return 'You sure?';
                };



        </script>
    </body>
</html>