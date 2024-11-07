<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, UPDATE");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin");
include('../DAO/DAO_HOME.php');


function execute(){
    $method = $_SERVER['REQUEST_METHOD'];
    $jsonData = file_get_contents('php://input');
    $params = json_decode($jsonData, true);

    switch($method){
        case 'GET':
            echo gethome();
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if(!empty($data)){
                addhome(strtoupper($data['select']), $data['Amount'], $data['Tax'], $data['Price']);
            } else {
                error_log('data is empty');
            }
            break;


        case 'DELETE':
            $cod = $_GET["code"];
            error_log($cod);
            deletehome($cod);
            break;

        case 'PUT';
            $code = $_GET["code"];
            $amount = $_GET["newAmount"];
            upadatehome($amount,$code);
            break;
            
        // case 'OPTION';
        //     $code = $_GET["code"];
        //     error_log($code);
        //     echo sethome($code);
        //     break;
        }
}

execute();
?>