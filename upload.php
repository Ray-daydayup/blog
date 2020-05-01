<?php
header('content-type:text/html;charset=utf-8');

// echo $_POST['jsonData'];
$myfile = fopen("./data/articles.txt", "w") or die("Unable to open file!");
// $txt = "Mickey Mouse\n";
fwrite($myfile, $_POST['jsonData']);

fclose($myfile);
