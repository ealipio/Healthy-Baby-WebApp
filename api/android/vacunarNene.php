<?php
	require_once('../config/mysql.php');
	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	$item    = $_POST['item'];
	$nino_ws = $_POST['nino_ws'];
	$usuario = $_POST['usuario'];

	$q = 'INSERT INTO tb_vacunas_x_ninos
	(id_nino, id_vacuna, id_dosis_vacunas, username, fecha_vacunacion, centro_salud, created_at)
	VALUES (:id_nino, :id_vacuna, :id_dosis_vacunas, :username, :fecha_vacunacion, :centro_salud, CURRENT_TIMESTAMP)';
/***
	$q = 'INSERT INTO tb_vacunas_x_ninos
	(id_nino, id_vacuna, id_dosis_vacunas, username, fecha_vacunacion, centro_salud, observaciones, created_at)
	VALUES (:id_nino, :id_vacuna, :id_dosis_vacunas, :username, :fecha_vacunacion, :centro_salud, :observaciones, CURRENT_TIMESTAMP)';
*/
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $nino_ws['NuCnv'], PDO::PARAM_STR);
	$stmt->bindParam(':id_vacuna',  $item['id_vacuna'], PDO::PARAM_STR);
	$stmt->bindParam(':id_dosis_vacunas',  $item['id_dosis_vacunas'], PDO::PARAM_STR);
	$stmt->bindParam(':username',  $usuario['username'], PDO::PARAM_STR);
	$stmt->bindParam(':fecha_vacunacion',  $item['fecha_vacunacion_'], PDO::PARAM_STR);
	$stmt->bindParam(':centro_salud',  $usuario['centro_salud'], PDO::PARAM_STR);
	//$stmt->bindParam(':observaciones',  $item->observaciones, PDO::PARAM_STR);
	$valor= $stmt->execute();
	echo json_encode($valor);
?>