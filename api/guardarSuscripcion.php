<?php
  require_once('config/mysql.php');
  
  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $rspta = json_decode(file_get_contents("php://input"));
  
  $correo = $rspta->correo;
  $id_nino = $rspta->id_nino;


	$q = 'INSERT INTO tb_suscripciones (id_nino, email, created_at) 
			values (:id_nino, :email, CURRENT_TIMESTAMP)';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $id_nino, PDO::PARAM_STR);
	$stmt->bindParam(':email',  $correo, PDO::PARAM_STR);
	$valor = $stmt->execute();
	
	echo json_encode($valor);

?>

