<?php

	$response = array('error' => 'No se recibio ningun parametro de busqueda.' );
	if ( isset( $_GET['numero'] )) {
		$id_nino  = (int)$_GET['numero'];
		try {
			require_once('../config/mysql.php');

			$db  = new EissonConnect();
			$dbh = $db->enchufalo();
			
			$q = 'SELECT * from tb_suscripciones
						WHERE id_nino =:id_nino';
				
			$stmt = $dbh->prepare($q);
			$stmt->bindParam(':id_nino',  $id_nino, PDO::PARAM_STR);
			$stmt->execute();

			$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

			$response = array('success' => $r );

		} catch (Exception $e) {
			$response = array('error' => 'Lo lamento, No se pudo conectar al WebService, intentelo mas tarde.' );
		}

	}
	echo json_encode($response);
	
?>