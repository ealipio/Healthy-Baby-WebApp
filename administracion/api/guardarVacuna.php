<?php
  require_once('../../api/config/mysql.php');
  
  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $rspta = json_decode(file_get_contents("php://input"));
  
  $vacuna = $rspta->vacuna;
  $dosis = $rspta->dosis;


	$q = 'INSERT INTO tb_vacunas (nombre_vacuna, observaciones, estado, created_at) 
			values (:nombre_vacuna, :observaciones, :estado, CURRENT_TIMESTAMP)';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':nombre_vacuna',  $vacuna->nombre_vacuna, PDO::PARAM_STR);
	$stmt->bindParam(':observaciones',  $vacuna->observaciones, PDO::PARAM_STR);
	$stmt->bindParam(':estado',  $vacuna->estado, PDO::PARAM_INT);
	$stmt->execute();
	
	$id_vacuna = $dbh->lastInsertId();
	$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

	foreach ($dosis as $vdosis => $value) {
		//var_dump($value->nombre_dosis);

		$q = 'INSERT INTO tb_dosis_vacunas (nombre_dosis, meses, id_vacuna, created_at) 
			values (:nombre_dosis, :meses, :id_vacuna, CURRENT_TIMESTAMP)';
	
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':nombre_dosis',  $value->nombre_dosis, PDO::PARAM_STR);
		$stmt->bindParam(':meses',  $value->meses, PDO::PARAM_INT);
		$stmt->bindParam(':id_vacuna',  $id_vacuna, PDO::PARAM_INT);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}



	$respuesta = array( 'estatus' => 'success','message' => 'Vacuna registrada Exitosamente', 'id_vacuna' => $id_vacuna, 'created_at' => date("Y-m-d H:i:s") );
	//var_dump($r);
	echo json_encode($respuesta);

?>

