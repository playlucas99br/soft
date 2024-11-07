
<?php

    include('../BANCO/database.php');
    
    function 
    getCategories(){
        $categories = myPDO -> query('SELECT * FROM categories');
        $categories = $categories -> fetchALL(PDO::FETCH_ASSOC);
        return json_encode($categories);
    };


    function addCategory ($name, $tax){
        $insertCategory = myPDO->prepare("INSERT INTO categories (name, tax) VALUES ('$name', '$tax')");
        $insertCategory->execute();
    }

    function deleteCategory ($cod){
        $removeCategories = myPDO->prepare("DELETE FROM categories where code = :cod");
        $removeCategories->bindParam(':cod', $cod);
        $removeCategories->execute();
    }
?>
