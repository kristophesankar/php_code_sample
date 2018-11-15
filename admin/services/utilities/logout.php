<?php
session_start();
if (isset($_SESSION) && !empty($_SESSION)) {
        $_SESSION['user'] = null;
       session_destroy();
       header("Location: http://");
}
?>
