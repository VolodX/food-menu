<?php
$_POST = json_decode(file_get_contents("php://input"), true); // перетворення(декодинг) JSON для PHP;
echo var_dump($_POST);