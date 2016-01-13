<?php
	require_once('config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	$dato = json_decode(file_get_contents("php://input"));

	$id_nino = $dato->id_nino;

	$q = 'SELECT * from tb_eisson_consulta_api
			WHERE nro_documento =:nro_documento';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':nro_documento',  $id_nino, PDO::PARAM_STR);
	$stmt->execute();

	$r = $stmt->fetch(PDO::FETCH_ASSOC);
	
	if($r){
		$v = array('success' => $r );
	}else{
		$v = array('error' => 'Lo lamento, no hubo resultados para esta busqueda.' );
	}
	

	echo json_encode($v);
?>