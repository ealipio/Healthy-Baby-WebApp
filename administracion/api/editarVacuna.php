<?php
	  require_once('../../api/config/mysql.php');
	  include_once dirname(__FILE__) . '../../api/config/config.php';
	  
	  $db  = new EissonConnect();
	  $dbh = $db->enchufalo();
  
  	session_start();
	
	if(isset($_SESSION['id_usuario'])){

		$rspta = json_decode(file_get_contents("php://input"));
		$vacuna=$rspta->vacuna;
		$dosis=$rspta->dosis;

		$q = 'UPDATE tb_vacunas
			SET nombre_vacuna=:nombre_vacuna, observaciones=:observaciones, estado=:estado, last_user=:last_user
			where id_vacuna=:id_vacuna';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_vacuna',  $vacuna->id_vacuna, PDO::PARAM_INT);
		$stmt->bindParam(':nombre_vacuna',  $vacuna->nombre_vacuna, PDO::PARAM_STR);
		$stmt->bindParam(':observaciones',  $vacuna->observaciones, PDO::PARAM_STR);
		$stmt->bindParam(':estado',  $vacuna->estado, PDO::PARAM_INT);
		$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
		$stmt->execute();

		foreach ($dosis as $v) {
			var_dump($v);
			if($v->nuevo == 1){
				$q = 'INSERT INTO tb_dosis_vacunas (nombre_dosis, meses, id_vacuna, last_user) 
				values (:nombre_dosis, :meses, :id_vacuna, :last_user)';
				$stmt = $dbh->prepare($q);
				$stmt->bindParam(':nombre_dosis',  $v->nombre_dosis, PDO::PARAM_STR);
				$stmt->bindParam(':meses',  $v->meses, PDO::PARAM_STR);
				$stmt->bindParam(':id_vacuna',  $vacuna->id_vacuna, PDO::PARAM_INT);
				$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
				$stmt->execute();
			}
			
		}

		//var_dump($r);
		echo json_encode($r);
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}
?>

