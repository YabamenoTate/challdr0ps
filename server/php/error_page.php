<?php
    include_once $_SERVER['DOCUMENT_ROOT']."/define.php";
    header("Content-Type: application/json; charset=utf-8");
    echo '{"error":'.$_GET["err_code"].'}';
    exit();
