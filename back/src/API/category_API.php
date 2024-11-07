<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Content-Type: application/json");
include("../DAO/DAO_CATEGORY.php");

function execute(){
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET':
            echo getCategories();
            break;

        case 'POST':

            $data = json_decode(file_get_contents('php://input'), true);
            if(!empty($data)){
                addCategory(strtoupper($data['category_bar']), $data['tax_bar']);
            } else {
                error_log('data is empty');
            }

        case 'DELETE':
            $cod = $_GET["code"];
            deleteCategory($cod);
            break;
    }
}

execute();
?>