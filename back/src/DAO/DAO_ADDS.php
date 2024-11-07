
<?php

    include('../BANCO/database.php');
    
    function sethome($cod){
        $sethome = myPDO->query("SELECT price, tax FROM products P JOIN categories C ON P.categorychose = C.code WHERE P.code = $cod");
        $sethome = $sethome -> fetchALL(PDO::FETCH_ASSOC);
        return json_encode($sethome);
    }
    function drophome(){
        $sethome = myPDO->prepare("DELETE FROM home WHERE status = false");
        $sethome->execute();
    }
?>