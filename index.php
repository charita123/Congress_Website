<?php
$query = $_GET['furl'];

$r = file_get_contents($query);
header("Content-Type : application/json");
header("Access-Control-Allow-Origin:*");
echo ($r);
?>