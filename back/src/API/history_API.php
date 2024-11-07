<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE");
header("Content-Type: application/json");
include('../DAO/DAO_HISTORY.php');


function execute(){
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET':
            echo gethistory();
            break;
    
        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if(!empty($data)){
                addhistory($data['pricetotal'], $data['taxtotal']);
            } else {
                error_log('data is empty');
            }
            break;
    }
    }
 execute()
?>