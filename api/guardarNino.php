<?php
	require_once('config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();


	  $rspta = json_decode(file_get_contents("php://input"));
	  $dato= $rspta->us;
	  $tipo=1;

		$q = 'SELECT * FROM tb_eisson_consulta_api 
				WHERE nro_documento = :nro_documento';


		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':nro_documento',  $dato->nro_documento, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);
		//var_dump($r);
		if($r){

			$rpta=array('success' => 'ya existe');
			echo json_encode($rpta);
			
		}
		else{
			$q = 'INSERT INTO tb_eisson_consulta_api (`nombres`,`apellido_paterno`,`apellido_materno`,`tipo_documento`,`nro_documento`,`fecha_nac`, `sexo`, `peso`,`talla`,`dni_madre`,`nombre_madre`, `dni_padre`,`nombre_padre`, `direccion`,`telefono`, `created_at`) 
					values (:nombres, :apellido_paterno, :apellido_materno, :tipo_documento, :nro_documento, :fecha_nac, :sexo, :peso, :talla, :dni_madre, :nombre_madre, :dni_padre, :nombre_padre, :direccion, :telefono, CURRENT_TIMESTAMP)';
			
			$stmt = $dbh->prepare($q);
			$stmt->bindParam(':nombres',  $dato->nombres, PDO::PARAM_STR);
			$stmt->bindParam(':apellido_paterno',  $dato->apellido_paterno, PDO::PARAM_STR);
			$stmt->bindParam(':apellido_materno',  $dato->apellido_materno, PDO::PARAM_STR);
			$stmt->bindParam(':tipo_documento',  $tipo, PDO::PARAM_STR);
			$stmt->bindParam(':nro_documento',  $dato->nro_documento, PDO::PARAM_STR);
			$stmt->bindParam(':fecha_nac',  $dato->fecha_nac, PDO::PARAM_STR);
			$stmt->bindParam(':sexo',  $dato->sexo, PDO::PARAM_STR);
			$stmt->bindParam(':peso',  $dato->peso, PDO::PARAM_STR);
			$stmt->bindParam(':talla',  $dato->talla, PDO::PARAM_STR);
			$stmt->bindParam(':dni_madre',  $dato->dni_madre, PDO::PARAM_STR);
			$stmt->bindParam(':nombre_madre',  $dato->nombre_madre, PDO::PARAM_STR);
			$stmt->bindParam(':dni_padre',  $dato->dni_padre, PDO::PARAM_STR);
			$stmt->bindParam(':nombre_padre',  $dato->nombre_padre, PDO::PARAM_STR);
			$stmt->bindParam(':direccion',  $dato->direccion, PDO::PARAM_STR);
			$stmt->bindParam(':telefono',  $dato->telefono, PDO::PARAM_STR);
			$valor = $stmt->execute();
			
			
			echo json_encode($valor);
		}

?>

