 <?php

session_start();
require_once('../../api/config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $rspta = json_decode(file_get_contents("php://input"));
$datos=$rspta->datos;
$username = $_SESSION['id_usuario'];

$llave = CLAVE;

$q        = 'SELECT * from tb_usuarios 				
			WHERE username=:username AND password=AES_ENCRYPT(:apassword, :llave2)';

			$stmt     = $dbh->prepare($q);
$stmt->bindParam(':username', $username,PDO::PARAM_STR);
$stmt->bindParam(':apassword', $datos->contraActual ,PDO::PARAM_STR);
$stmt->bindParam(':llave2', $llave, PDO::PARAM_STR);
$stmt->execute();
$r = $stmt->fetch(PDO::FETCH_ASSOC);
if($r){

$q        = 'UPDATE tb_usuarios 
				SET password=AES_ENCRYPT(:npassword, :llave1)
			WHERE username=:username AND password=AES_ENCRYPT(:apassword, :llave2)';


$stmt     = $dbh->prepare($q);
$stmt->bindParam(':npassword', $datos->nuevaContra ,PDO::PARAM_STR);
$stmt->bindParam(':username', $username,PDO::PARAM_STR);
$stmt->bindParam(':apassword', $datos->contraActual ,PDO::PARAM_STR);
$stmt->bindParam(':llave1', $llave, PDO::PARAM_STR);
$stmt->bindParam(':llave2', $llave, PDO::PARAM_STR);
$stmt->execute();
$r = $stmt->fetch(PDO::FETCH_ASSOC);

$q        = 'SELECT * from tb_usuarios 				
			WHERE username=:username AND password=AES_ENCRYPT(:npassword, :llave2)';

			$stmt     = $dbh->prepare($q);
$stmt->bindParam(':username', $username,PDO::PARAM_STR);
$stmt->bindParam(':npassword', $datos->nuevaContra ,PDO::PARAM_STR);
$stmt->bindParam(':llave2', $llave, PDO::PARAM_STR);
$stmt->execute();

$r = $stmt->fetch(PDO::FETCH_ASSOC);

if ( $r ) {
	echo ("ok");
}
else{
	echo ("error");
}

}
else{
echo "bad";

}
?>