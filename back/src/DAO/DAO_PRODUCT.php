
<?php

    include('../BANCO/database.php');
    
    function getProducts(){
        $products = myPDO -> query('SELECT p.code, p.name ,p.price,p.amount,categorychose,c.name AS category from products p join categories c ON p.categorychose = c.code ORDER BY p.amount DESC');
        $products = $products -> fetchALL(PDO::FETCH_ASSOC);
        return json_encode($products);
    };


    function addProducts ($name , $amount , $price , $categorychose){
        $insertproducts = myPDO->prepare("INSERT INTO products (name,amount, price, categorychose) VALUES ('$name' , '$amount' , '$price' , '$categorychose')");
        $insertproducts->execute();
    }

    function deleteProducts ($cod){
        $removeproducts = myPDO->prepare("DELETE FROM products where code = :cod");
        $removeproducts->bindParam(':cod', $cod);
        $removeproducts->execute();
    }
?>