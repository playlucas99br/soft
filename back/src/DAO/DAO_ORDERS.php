<?php

    include('../BANCO/database.php');

    
    function getorders(){
        $home = myPDO -> query('SELECT * FROM history');
        $home = $home -> fetchALL(PDO::FETCH_ASSOC);
        return json_encode($home);
    };
?>