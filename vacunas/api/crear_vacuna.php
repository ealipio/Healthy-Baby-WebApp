<?php
	session_start();

	require_once('../../api/config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	$vacuna = json_decode(file_get_contents("php://input"));
	//echo json_encode($_SESSION['id_usuario']);

	if(isset($_SESSION['id_usuario'])){

		$q = 'INSERT INTO tb_vacunas_x_ninos (id_nino, id_vacuna, id_dosis_vacunas, username, fecha_vacunacion, centro_salud, observaciones, created_at) 
				values (:id_nino, :id_vacuna, :id_dosis_vacunas, :username, :fecha_vacunacion, :centro_salud, :observaciones, CURRENT_TIMESTAMP)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_nino',  $vacuna->id_nino, PDO::PARAM_STR);
		$stmt->bindParam(':id_vacuna',  $vacuna->id_vacuna, PDO::PARAM_STR);
		$stmt->bindParam(':id_dosis_vacunas',  $vacuna->id_dosis_vacunas, PDO::PARAM_STR);
		$stmt->bindParam(':username',  $_SESSION['id_usuario'], PDO::PARAM_STR);
		$stmt->bindParam(':fecha_vacunacion',  $vacuna->fecha_vacunacion, PDO::PARAM_STR);
		$stmt->bindParam(':centro_salud',  $vacuna->centro_salud, PDO::PARAM_STR);
		$stmt->bindParam(':observaciones',  $vacuna->observaciones, PDO::PARAM_STR);
		$stmt->execute();

		echo"Vacuna guardada correctamente.";
	}
	else{
		echo"Error al intentar guardar vacuna";
	}

?>