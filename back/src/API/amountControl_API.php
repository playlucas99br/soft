<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE");
header("Content-Type: application/json");
include('../DAO/DAO_HOME.php');


function execute(){
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
     case 'PUT';
            $code = $_GET["code"];
            $amount = $_GET['newAmount'];
            error_log($code);
            error_log($amount);
            upadateamount($amount,$code);
            break;
    }
}
execute()
?>