<?php
	$response = array('error' => 'No se recibio ningun parametro de busqueda.' );
	
		$id_nino  = $_GET['numero'];
	
			require_once('../config/mysql.php');

			$db  = new EissonConnect();
			$dbh = $db->enchufalo();
		
	$q = 'SELECT * from tb_info_adicional
			 
			WHERE id_nino =:id_nino

			ORDER BY fecha_medicion DESC';
				
			$stmt = $dbh->prepare($q);
			$stmt->bindParam(':id_nino',  $id_nino, PDO::PARAM_STR);
			$stmt->execute();

			$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

			$response = array('success' => $r );

	echo json_encode($response);
?>