<?php
    $port = '1337';
    $isSsl = false;
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Lunch roulette on Laravel</title>
	<meta name="viewport" content="width=device-width">

	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/main.css">
    <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
</head>
<body>
 <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <p>Lunch roulette yo!</p>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/plugins.js"></script>

        <script src="/js/vendor/socket.io.js"></script>
        <br/>
        <div id="register-window">
            <form id="register">
                <label for="userId">Please register:</label>
                <input type="text" id="userId" name = "uid" />
                <input type="submit" class="btn-success" />
            </form>
        </div>

        <div id="chat-window"></div>
        <script>
            var chatConfig = {
                host: '<?php echo $_SERVER['SERVER_NAME']?>',
                port: <?php echo $port?>,
                https: <?php echo $isSsl? 'true' : 'false'; ?>
            }
        </script>
        <script src="js/app/User.js"></script>
        <script src="js/app/Message.js"></script>
        <script src="js/app/Chat.js"></script>
        <script src="js/app/Theme.js"></script>
        <script src="js/main.js"></script>
</body>
</html>
