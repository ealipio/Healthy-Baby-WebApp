<?php
	  require_once('../../api/config/mysql.php');
	  
	  $db  = new EissonConnect();
	  $dbh = $db->enchufalo();
  
  	session_start();
	
	if(isset($_SESSION['id_usuario'])){

		$rspta = json_decode(file_get_contents("php://input"));
		$dosis=$rspta->dosis;

		$q = 'UPDATE tb_dosis_vacunas
				SET nombre_dosis=:nombre_dosis, meses=:meses, last_user=:last_user
				where id_dosis_vacunas=:id_dosis_vacunas';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':nombre_dosis',  $dosis->nombre_dosis, PDO::PARAM_STR);
		$stmt->bindParam(':meses',  $dosis->meses, PDO::PARAM_STR);
		$stmt->bindParam(':id_dosis_vacunas',  $dosis->id_dosis_vacunas, PDO::PARAM_STR);
		$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
		$valor = $stmt->execute();


		//var_dump($r);
		echo json_encode($valor);
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}
?>

