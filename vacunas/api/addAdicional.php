<?php
	require_once('../../api/config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	session_start();
	
	if(isset($_SESSION['id_usuario'])){
		$data = json_decode(file_get_contents("php://input"));
		$objDatos=$data->datos;
		

		$q = 'INSERT INTO tb_info_adicional (id_nino, peso, talla, temperatura, hemoglobina, fecha_medicion, observaciones, username, nutrientes, created_at) 
				values (:id_nino, :peso, :talla, :temperatura, :hemoglobina, :fecha_medicion, :observaciones, :username, :nutrientes, CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_nino',  $objDatos->id_nino, PDO::PARAM_STR);
		$stmt->bindParam(':peso',  $objDatos->peso, PDO::PARAM_STR);
		$stmt->bindParam(':talla',  $objDatos->talla, PDO::PARAM_STR);
		$stmt->bindParam(':temperatura',  $objDatos->temperatura, PDO::PARAM_STR);
		$stmt->bindParam(':hemoglobina',  $objDatos->hemoglobina, PDO::PARAM_STR);
		$stmt->bindParam(':fecha_medicion',  $objDatos->fecha_medicion, PDO::PARAM_STR);
		$stmt->bindParam(':nutrientes',  $objDatos->nutrientes, PDO::PARAM_STR);
		$stmt->bindParam(':observaciones',  $objDatos->observaciones, PDO::PARAM_STR);
		$stmt->bindParam(':username',  $_SESSION['id_usuario'], PDO::PARAM_STR);

		$valor= $stmt->execute();

		echo json_encode($valor);
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}


	
?>