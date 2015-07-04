<?php 
	session_start();
	
	$admin = "adminGameEvent";
	$admin_pass = md5("asdasd");
	
	$msg_collector = '';
	if(isset($_POST['login']))
	{
		$username = isset($_POST['username']) ? trim( ($_POST['username'])) : "";
		$pass = isset($_POST['pass']) ? trim( ($_POST['pass'])) : ""; 
		
		if(!$username || !$pass)
		{
			$msg_collector .=  "fill in you login details!";
			
		}
		else
		{
			if($admin != $username)
			{
				$msg_collector .= "Username is wrong.";
			}
			if($admin_pass != md5($pass)){
				$msg_collector .= "pass is wrong";
			}
			 
			if($msg_collector)
			{
				print $msg_collector;
				unset($_POST);
			}
			else{
				$_SESSION['admin'] = 1;
				$_SESSION['username'] = $admin;
				header("Location: panel.php");
			}
		}
	}

	if(isset($_POST['logout']))
	{
		$_SESSION['admin'] = 0;
		unset($_SESSION['admin']);
		session_destroy();
	}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>GameEvent</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <!-- Bootstrap 3.3.4 -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
    <!-- iCheck -->
    <link href="plugins/iCheck/square/blue.css" rel="stylesheet" type="text/css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="index2.html">GameEvent</a>
      </div><!-- /.login-logo -->
      <?php 
      
      if((int)$_SESSION['admin'] == 1)
      {
      	header("Location: panel.php");
      	exit;
      }
      else {
      ?>
	      <div class="login-box-body">
	        <p class="login-box-msg">Sign in to start your session</p>
	        <form action="index.php" method="post">
	          <div class="form-group has-feedback">
	            <input type="text" name="username" class="form-control" placeholder="User"/>
	            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
	          </div>
	          <div class="form-group has-feedback">
	            <input type="password" name="pass" class="form-control" placeholder="Password"/>
	            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
	          </div>
	          <div class="row">
	             
	            <div class="col-xs-4">
	              <button type="submit" name="login" class="btn btn-primary btn-block btn-flat">Sign In</button>
	            </div><!-- /.col -->
	          </div>
	        </form>
	 
	 
	      </div><!-- /.login-box-body -->
      <?php 
      }
      ?>
    </div><!-- /.login-box -->

    <!-- jQuery 2.1.4 -->
    <script src="/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    <!-- Bootstrap 3.3.2 JS -->
    <script src="/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <!-- iCheck -->
    <script src="/plugins/iCheck/icheck.min.js" type="text/javascript"></script>
    <script>
      $(function () {
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });
      });
    </script>
  </body>
</html>