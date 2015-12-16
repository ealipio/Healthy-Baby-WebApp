<?php
  require_once('../../api/config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();

  $rspta = json_decode(file_get_contents("php://input"));
  $dato=$rspta->id;

	$q = 'UPDATE tb_usuarios
			SET activo=0
		where username=:username';

	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $dato, PDO::PARAM_STR);

	$valor = $stmt->execute();
	echo json_encode($valor);

?>