<?php

echo "<h1>Max-Size</h1>";

echo "<pre>";
echo "memory_limit : " . ini_get("memory_limit") .PHP_EOL;
echo "post_max_size : " . ini_get("post_max_size") .PHP_EOL;
echo "upload_max_filesize : " . ini_get("upload_max_filesize") .PHP_EOL;
echo "</pre>";