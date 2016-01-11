<?php
	require_once('../../api/config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	$dato = json_decode(file_get_contents("php://input"));

	//var_dump($dato->id_vacuna);

	$q = 'SELECT id_vacuna, nombre_vacuna, observaciones, estado
		FROM tb_vacunas
		WHERE id_vacuna=:id_vacuna and activo=1';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_vacuna',  $dato->id_vacuna, PDO::PARAM_STR);
	$stmt->execute();
	$r['vacunas'] = $stmt->fetch(PDO::FETCH_ASSOC);


	$q = 'SELECT id_dosis_vacunas, nombre_dosis, meses, id_vacuna, 0 as nuevo  from tb_dosis_vacunas
		WHERE id_vacuna=:id_vacuna';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_vacuna',  $dato->id_vacuna, PDO::PARAM_STR);
	$stmt->execute();
	$r['dosis'] = $stmt->fetchAll(PDO::FETCH_ASSOC);


	//var_dump($r);
	//echo json_encode($r);

	echo json_encode($r);
?>