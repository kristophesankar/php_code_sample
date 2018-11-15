<?php
//checks if user is logged in
require_once('config.php') ;
session_start();
if (!isset($_SESSION['user']) && empty($_SESSION['user'])) {
       session_destroy();
       header("Location: http://". ADMINURL ."/index.php");
}
?>
