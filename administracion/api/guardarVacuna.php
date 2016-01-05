<?php
	require_once('../../api/config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	
	session_start();
 	if(isset($_SESSION['id_usuario'])){

		$rspta = json_decode(file_get_contents("php://input"));

		$vacuna = $rspta->vacuna;
		$dosis = $rspta->dosis;

		//var_dump($vacuna);

		$q = 'INSERT INTO tb_vacunas (nombre_vacuna, observaciones, estado, created_at, last_user) 
				values (:nombre_vacuna, :observaciones, :estado, CURRENT_TIMESTAMP, :last_user)';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':nombre_vacuna',  $vacuna->nombre_vacuna, PDO::PARAM_STR);
		$stmt->bindParam(':observaciones',  $vacuna->observaciones, PDO::PARAM_STR);
		$stmt->bindParam(':estado',  $vacuna->estado, PDO::PARAM_INT);
		$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
		$valor1 = $stmt->execute();

		$id_vacuna = $dbh->lastInsertId();



		if($valor1){
			$valor2=true;
			foreach ($dosis as $vdosis => $value) {

				$q = 'INSERT INTO tb_dosis_vacunas (nombre_dosis, meses, id_vacuna, created_at, last_user) 
					values (:nombre_dosis, :meses, :id_vacuna, CURRENT_TIMESTAMP, :last_user)';
			
				$stmt = $dbh->prepare($q);
				$stmt->bindParam(':nombre_dosis',  $value->nombre_dosis, PDO::PARAM_STR);
				$stmt->bindParam(':meses',  $value->meses, PDO::PARAM_INT);
				$stmt->bindParam(':id_vacuna',  $id_vacuna, PDO::PARAM_INT);
				$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
				$valor2 = $stmt->execute();
			}
			echo json_encode($valor2);
		}
		else{
			echo json_encode($valor1);
		}
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}

?>

