<?php
	require_once('../../api/config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	$q = 'SELECT max(suma) as total from (SELECT count(id_dosis_vacunas) as suma from tb_dosis_vacunas
			group by id_vacuna) as t';

	//var_dump($r);
	//echo json_encode($r);

	echo json_encode($r);
?>