<?php

//Object {centro_salud: "ddcsd", id_dosis_vacuna: "545", id_vacuna: "`", id_nino: "32", observaciones: "ninguna"}

require_once('config/mysql.php');
$db              = new EissonConnect();
$dbh             = $db->enchufalo();
$centro_salud    = $_POST['data']['centro_salud'];
$id_dosis_vacuna = $_POST['data']['id_dosis_vacuna'];
$id_vacuna       = $_POST['data']['id_vacuna'];
$id_nino         = $_POST['data']['id_nino'];
$observaciones   = $_POST['data']['observaciones'];
$q          = 'INSERT INTO tb_vacunas_x_ninos SET apellido_paterno = :apellido_patern';
$stmt     = $dbh->prepare($q);
$stmt->bindParam(':apellido_paterno', $apellido_paterno, PDO::PARAM_STR);
$stmt->bindParam(':apellido_materno', $apellido_materno, PDO::PARAM_STR);
$stmt->bindParam(':tipo_documento', $tipo_documento, PDO::PARAM_STR);
$stmt->bindParam(':nro_documento', $nro_documento, PDO::PARAM_STR);
$stmt->bindParam(':fecha_nac', $fecha_nac, PDO::PARAM_STR);
$stmt->execute();
$r = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($r);
/*
if ( $r ) {
	$_SESSION['id_usuario'] = $r['id_usuario'];
	$q = 'SELECT tbhp.id_perfil, tp.nombre_perfil FROM tb_usuarios_has_tb_perfil tbhp
	INNER JOIN tb_perfil tp ON tp.id_perfil  = tbhp.id_usuario
	WHERE id_usuario = :id_usuario';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_usuario', $r['id_usuario'],PDO::PARAM_STR);
	$stmt->execute();
	$r = $stmt->fetch(PDO::FETCH_ASSOC);
	$_SESSION['id_perfil'] = $r['id_perfil'];
	$_SESSION['nombre_perfil'] = $r['nombre_perfil'];
	echo "ok";
} else{
	echo "0";
}*/

?>