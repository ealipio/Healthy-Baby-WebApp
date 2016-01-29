<?php
	require_once('../config/mysql.php');
	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	$nino_ws = $_POST['nino_ws'];
	$usuario = $_POST['usuario'];

	$q = 'INSERT INTO tb_info_adicional (id_nino, peso, talla, temperatura, hemoglobina, fecha_medicion, username, nutrientes, observaciones, created_at)
			                     VALUES (:id_nino, :peso, :talla, :temperatura, :hemoglobina, :fecha_medicion, :username, :nutrientes, :observaciones, CURRENT_TIMESTAMP)';

	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $nino_ws['NuCnv'], PDO::PARAM_STR);
	$stmt->bindParam(':peso',  $nino_ws['peso'], PDO::PARAM_STR);
	$stmt->bindParam(':talla',  $nino_ws['talla'], PDO::PARAM_STR);
	$stmt->bindParam(':temperatura',  $nino_ws['temperatura'], PDO::PARAM_STR);
	$stmt->bindParam(':hemoglobina',  $nino_ws['hemoglobina'], PDO::PARAM_STR);
	$stmt->bindParam(':fecha_medicion',  $nino_ws['fecha_medicion_'], PDO::PARAM_STR);
	$stmt->bindParam(':nutrientes',  $nino_ws['nutrientes'], PDO::PARAM_STR);
	$stmt->bindParam(':observaciones',  $nino_ws['observaciones'], PDO::PARAM_STR);
	$stmt->bindParam(':username',  $usuario['username'], PDO::PARAM_STR);
	$valor= $stmt->execute();

	echo json_encode($valor);
?>