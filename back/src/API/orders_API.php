<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE");
header("Content-Type: application/json");
include('../DAO/DAO_ORDERS.php');


function execute(){
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET':
            echo getorders();
            break;
    }   
}
 execute()
?>