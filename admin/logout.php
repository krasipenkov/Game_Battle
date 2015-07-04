<?php 

$_SESSION['admin'] = 0;
unset($_SESSION['admin']);

session_destroy();

Header("Location: /admin/");

?>