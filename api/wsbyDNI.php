<?php
	//12345678
	require_once('config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	$response = array('error' => 'No se recibio ningun parametro de busqueda.' );
	if ( isset( $_GET['numero'] )) {
		$numero_cnv  = (int)$_GET['numero'];
		try {


			$q = 'SELECT * from tb_eisson_consulta_api
			WHERE nro_documento =:nro_documento';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':nro_documento',  $numero_cnv, PDO::PARAM_STR);
	$stmt->execute();

	$r = $stmt->fetch(PDO::FETCH_ASSOC);
	
	if($r){
		$response = array('success' => $r );
	}else{
		$response = array('error' => 'Lo lamento, no hubo resultados para esta busqueda.' );
	}
			
		} catch (Exception $e) {
			$response = array('error' => 'Lo lamento, No se pudo conectar al WebService, intentelo mas tarde.' );
		}

	}
	echo json_encode($response);
?>