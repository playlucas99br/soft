<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Content-Type: application/json");

include('../DAO/DAO_PRODUCT.php');


function execute(){
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET':
            echo getProducts();
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if(!empty($data)){
                addProducts(strtoupper($data['product']), $data['amount'], $data['price'], $data['select']);
            } else {
                error_log('data is empty');
            }
            break;

        case 'DELETE':
            $cod = $_GET["code"];
            deleteProducts($cod);
            break;
    }
}

execute();
?>