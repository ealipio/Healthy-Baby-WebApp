<?php

session_start();
require_once('config/mysql.php');
include_once dirname(__FILE__) . '/config/config.php';

$usuario  = $_POST['usuario'];
$apassword = $_POST['actual'];
$npassword = $_POST['npassword'];
$llave = CLAVE;

$db       = new EissonConnect();
$dbh      = $db->enchufalo();

$q = 'SELECT * from tb_usuarios 
	WHERE username=:username AND password=AES_ENCRYPT(:apassword, :llave)';

	$stmt     = $dbh->prepare($q);
	$stmt->bindParam(':apassword', $apassword,PDO::PARAM_STR);
	$stmt->bindParam(':username', $usuario,PDO::PARAM_STR);
	$stmt->bindParam(':llave', $llave, PDO::PARAM_STR);
	$stmt->execute();
	$r = $stmt->fetch(PDO::FETCH_ASSOC);

if($r){
	$q = 'UPDATE tb_usuarios
		SET password=AES_ENCRYPT(:npassword, :llave1), last_user=:username2
		WHERE username=:username AND password=AES_ENCRYPT(:apassword, :llave2)';

	$stmt     = $dbh->prepare($q);
	$stmt->bindParam(':npassword', $npassword,PDO::PARAM_STR);
	$stmt->bindParam(':username2', $usuario,PDO::PARAM_STR);
	$stmt->bindParam(':username', $usuario,PDO::PARAM_STR);
	$stmt->bindParam(':apassword', $apassword,PDO::PARAM_STR);
	$stmt->bindParam(':llave1', $llave, PDO::PARAM_STR);
	$stmt->bindParam(':llave2', $llave, PDO::PARAM_STR);
	$r = $stmt->execute();

	if ( $r ) {
		$rpta=array('success' => 'Contraseña modificada exitosamente.');
	}else{
		$rpta=array('error' => 'Se encontró un error al intentar cambiar la contraseña.');
	}
}
else{
	$rpta=array('error' => 'La contraseña actual es incorrecta.');
	
}

echo json_encode($rpta);


?>