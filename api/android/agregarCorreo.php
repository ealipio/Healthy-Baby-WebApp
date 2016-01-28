<?php
	require_once('../config/mysql.php');
	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	$email = $_POST['email'];
	$NuCnv = $_POST['NuCnv'];

	$q = 'INSERT INTO tb_suscripciones (id_nino, email, created_at) 
			values (:id_nino, :email, CURRENT_TIMESTAMP)';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $NuCnv, PDO::PARAM_STR);
	$stmt->bindParam(':email',  $email, PDO::PARAM_STR);
	$valor = $stmt->execute();

	$v = array('success' => $valor );
	
	echo json_encode($v);
?>