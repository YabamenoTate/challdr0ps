<?php
    $isProxy = false;
    if (isset($_SERVER["HTTP_VBSGSQJUAZFNLYNHAR9A"]))
    {
        $isProxy = $_SERVER["HTTP_VBSGSQJUAZFNLYNHAR9A"] == "FhmfKSnCQQ4ETj2QfS9M";
    }
    if (!$isProxy)
    {
        echo "レンタルサーバ稼働中！";
        exit();
    }