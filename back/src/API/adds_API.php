<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin");
include('../DAO/DAO_ADDS.php');


function execute(){
    $method = $_SERVER['REQUEST_METHOD'];
    $jsonData = file_get_contents('php://input');
    $params = json_decode($jsonData, true);

    switch($method){
        case 'GET':
            $cod = $_GET["cod"];
            error_log($cod);
            echo sethome($cod);
            break;
        
        case 'DELETE':
            drophome();
            break;
    }

}
execute();
?>