<?php
	require_once('../config/mysql.php');

	$db   = new EissonConnect();
	$dbh  = $db->enchufalo();
	$q    = 'SELECT va.id_vacuna, va.nombre_vacuna FROM tb_vacunas va WHERE va.estado=1 AND va.activo = 1';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$respuesta = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$q = 'SELECT id_dosis_vacunas as id_dosis, nombre_dosis as dosis, meses from tb_dosis_vacunas WHERE id_vacuna=:id_vacuna';

	foreach($respuesta as $k => $v) {
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_vacuna',  $v['id_vacuna'], PDO::PARAM_INT);
		$stmt->execute();
		$dosis = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$respuesta[$k]['dosis'] = $dosis;
	}
	echo json_encode($respuesta);
?>