<?php

session_start();
require_once('config/mysql.php');
$usuario  = $_POST['usuario'];
$password = $_POST['password'];
$db       = new EissonConnect();
$dbh      = $db->enchufalo();
$q        = 'SELECT id_usuario FROM tb_usuarios WHERE nombre_usuario = :usuario AND contraseña = :password';
$stmt     = $dbh->prepare($q);
$stmt->bindParam(':usuario', $usuario,PDO::PARAM_STR);
$stmt->bindParam(':password', $password,PDO::PARAM_STR);
$stmt->execute();
$r = $stmt->fetch(PDO::FETCH_ASSOC);
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
}

?>