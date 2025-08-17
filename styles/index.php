<?php 
    $DNS = '/'. explode('/',$_SERVER['PHP_SELF'])[1];
    session_start();
    if(empty($_SESSION['myuserId'])){
        session_destroy();
        header('Location: '. $DNS .'/Index.php');
        die;
    }else{
        header('Location: ' . $DNS .'/Home.php');
        die;
    }
?>