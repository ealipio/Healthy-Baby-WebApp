<?php
if ( isset($_GET['id']) ) {
	require_once('../config/mysql.php');
	$id   = $_GET['id'];
	$db   = new EissonConnect();
	$dbh  = $db->enchufalo();
	$q    = 'SELECT va.id_vacuna, va.nombre_vacuna, va.observaciones FROM tb_vacunas va WHERE va.estado=1 AND va.activo = 1 AND va.id_vacuna = :id';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id',  $id, PDO::PARAM_INT);
	$stmt->execute();
	$respuesta = $stmt->fetch(PDO::FETCH_ASSOC);
	echo json_encode($respuesta);
}
?>