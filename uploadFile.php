<?php
header('content-type:text/html;charset=utf-8');

// echo '<pre>';
// print_r($_FILES);
// echo '</pre>';
if ($_FILES["file"]["error"] > 0) {
    echo "错误：" . $_FILES["file"]["error"] . "<br>";
} else {
    move_uploaded_file($_FILES["file"]["tmp_name"], "./articles/" . $_FILES["file"]["name"]);
}
