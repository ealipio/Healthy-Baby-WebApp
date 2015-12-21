<?php
	require_once('config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	$dato = json_decode(file_get_contents("php://input"));

	$id_nino = $dato->NuCnv;

	$q = 'SELECT * from tb_suscripciones
			WHERE id_nino =:id_nino';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $id_nino, PDO::PARAM_STR);
	$stmt->execute();

	$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($r);
?>