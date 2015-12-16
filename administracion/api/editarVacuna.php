<?php
  require_once('../../api/config/mysql.php');
  include_once dirname(__FILE__) . '../../api/config/config.php';
  
  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $rspta = json_decode(file_get_contents("php://input"));
  $vacuna=$rspta->vacuna;
  $dosis=$rspta->dosis;

  //$dato = $_POST['usuario'];

	//var_dump($rspta);
	//var_dump($perfil);
	//var_dump($dato->perfiles);

	$q = 'UPDATE tb_vacunas
		SET nombre_vacuna=:nombre_vacuna, observaciones=:observaciones, estado=:estado
		where id_vacuna=:id_vacuna';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_vacuna',  $vacuna->id_vacuna, PDO::PARAM_INT);
	$stmt->bindParam(':nombre_vacuna',  $vacuna->nombre_vacuna, PDO::PARAM_STR);
	$stmt->bindParam(':observaciones',  $vacuna->observaciones, PDO::PARAM_STR);
	$stmt->bindParam(':estado',  $vacuna->estado, PDO::PARAM_INT);
	$stmt->execute();

	foreach ($dosis as $v) {
		var_dump($v);
		if($v->nuevo == 1){
			$q = 'INSERT INTO tb_dosis_vacunas (nombre_dosis, meses, id_vacuna) 
			values (:nombre_dosis, :meses, :id_vacuna)';
			$stmt = $dbh->prepare($q);
			$stmt->bindParam(':nombre_dosis',  $v->nombre_dosis, PDO::PARAM_STR);
			$stmt->bindParam(':meses',  $v->meses, PDO::PARAM_STR);
			$stmt->bindParam(':id_vacuna',  $vacuna->id_vacuna, PDO::PARAM_INT);
			$stmt->execute();
		}
		
	}

	//var_dump($r);
	echo json_encode($r);

?>

