<?php
	  require_once('../../api/config/mysql.php');

	  $db  = new EissonConnect();
	  $dbh = $db->enchufalo();


  	session_start();
	
	if(isset($_SESSION['id_usuario'])){

		$rspta = json_decode(file_get_contents("php://input"));
		$dato=$rspta->id;

		$q = 'UPDATE tb_vacunas
			SET activo=0, estado=0, last_user=:last_user
			where id_vacuna=:id_vacuna';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_vacuna',  $dato, PDO::PARAM_STR);
		$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);

		$valor = $stmt->execute();
		echo json_encode($valor);
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}
?>