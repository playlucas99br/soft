
<?php

    include('../BANCO/database.php');
    
    function gethome(){
        $home = myPDO -> query('SELECT h.code, p.name AS name, h.price, h.amount as amount_home, h.tax, p.amount as amount_product, p.code as code_product FROM home h JOIN products p ON h.name = p.code WHERE status = false');
        $home = $home -> fetchALL(PDO::FETCH_ASSOC);
        return json_encode($home);
    };


    function addhome ($name ,$Amount, $tax, $price){
        $inserthome = myPDO->prepare("INSERT INTO home (name, amount, price, tax, status ) VALUES ('$name' ,'$Amount','$price', '$tax', 'false')");
        $inserthome->execute();
    }

    function deletehome ($cod){
        $removehome = myPDO->prepare("DELETE FROM home where code = :cod");
        $removehome->bindParam(':cod', $cod);
        $removehome->execute();
        
    }


    function upadatehome($amount, $code){
        $updatehome = myPDO->prepare("UPDATE home SET amount = $amount WHERE code = $code");
        $updatehome->execute();
    }

    function cleartable(){
        $cleartable = myPDO->prepare("DELETE FROM home");
        $cleartable->execute();
    }

    function upadateamount($amount, $code){
        $updatamount = myPDO->prepare("UPDATE products SET amount = $amount WHERE code = $code");
        $updatamount->execute();
    }

?>


