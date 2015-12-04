<?php
require_once("/config/mysql.php");
require_once("DAO.php");

$DAO=new DAO();

$r=$DAO->getCentros();

if($r){
	echo $r;
}else{
	print 'no data';
}

?>