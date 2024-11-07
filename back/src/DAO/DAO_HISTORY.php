
<?php

    include('../BANCO/database.php');

    
    function gethistory(){
        $home = myPDO -> query('SELECT * FROM home WHERE status = true');
        $home = $home -> fetchALL(PDO::FETCH_ASSOC);
        return json_encode($home);
    };


    function addhistory($totalvalue,$totaltax){
        $inserthome = myPDO->prepare("INSERT INTO history (totalvalue, totaltax) VALUES ('$totalvalue','$totaltax')");
        $inserthome->execute();
        $code = myPDO->lastInsertId();
        updatehistory($code);
        updateStatues();
    }

    function updatehistory($code){
        $updatehome = myPDO->prepare("UPDATE home SET cod_order = $code WHERE status = false");
        $updatehome->execute();
    }

    function updateStatues(){
        $updatestatus = myPDO->prepare("UPDATE home SET status = true");
        $updatestatus->execute();
    }
?> 