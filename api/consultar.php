<?php

/*
CREATE TABLE `tb_eisson_consulta_api` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `tipo_documento` int(11) NOT NULL COMMENT 'tipo de  documento DNI 1 CUI 2',
  `nro_documento` varchar(10) NOT NULL,
  `fecha_nac` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1
*/

require_once('config/mysql.php');
$db       = new EissonConnect();
$dbh      = $db->enchufalo();
$apellido_paterno = $_POST['data']['apellido_paterno'];
$apellido_materno = $_POST['data']['apellido_materno'];
$tipo_documento   = $_POST['data']['tipo_documento'];
$nro_documento    = $_POST['data']['nro_documento'];
$fecha_nac        = $_POST['data']['fecha_nac'];
$q          = 'SELECT * FROM tb_eisson_consulta_api WHERE apellido_paterno = :apellido_paterno AND apellido_materno = :apellido_materno AND tipo_documento=:tipo_documento AND nro_documento=:nro_documento AND fecha_nac=:fecha_nac';
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