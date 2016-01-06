<?php

session_start();
require_once('config/mysql.php');
include_once dirname(__FILE__) . '/config/config.php';

$usuario  = $_POST['usuario'];
$password = $_POST['password'];
$llave = CLAVE;
//var_dump($llave);
$rpta['login']=0;


$db       = new EissonConnect();
$dbh      = $db->enchufalo();

$q        = 'SELECT username, nombres, apellido_paterno FROM tb_usuarios WHERE username = :username AND password = AES_ENCRYPT(:password, :llave) and activo=1';
$stmt     = $dbh->prepare($q);
$stmt->bindParam(':username', $usuario,PDO::PARAM_STR);
$stmt->bindParam(':password', $password,PDO::PARAM_STR);
$stmt->bindParam(':llave', $llave,PDO::PARAM_STR);
$stmt->execute();
$r = $stmt->fetch(PDO::FETCH_ASSOC);




if ( $r ) {
	
	$_SESSION['id_usuario'] = $r['username'];
	$_SESSION['nombres'] = $r['nombres'];
	$_SESSION['ape_pat'] = $r['apellido_paterno'];
	

	$q = 'SELECT tbhp.id_perfil, tp.nombre_perfil
			FROM tb_usuarios_x_perfil tbhp
			INNER JOIN tb_perfiles tp ON tp.id_perfil  = tbhp.id_perfil
			WHERE username = :username
			ORDER BY tbhp.id_perfil';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',$usuario,PDO::PARAM_STR);
	$stmt->execute();
	$rpta['perfiles'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$_SESSION['id_perfil'] = $rpta['perfiles'];
	$_SESSION['usuario'] = $usuario;

	//echo $rpta['perfiles'];
	//$_SESSION['id_perfil'] = $r['id_perfil'];
	//$_SESSION['nombre_perfil'] = $r['nombre_perfil'];

	$rpta['login']="ok";

}

echo json_encode($rpta);
?>