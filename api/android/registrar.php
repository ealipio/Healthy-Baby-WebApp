<?php
	require_once'../config/mysql.php';

		$db  = new EissonConnect();
		$dbh = $db->enchufalo();

		//$nino_nw = $_POST['nino_ws'];
		$nombres  = $_POST['nombres'];
		$apellido_paterno  = $_POST['apellido_paterno'];
		$apellido_materno  = $_POST['apellido_materno'];
		$tipo_documento  =  1;
		$nro_documento  = $_POST['nro_documento'];
		$fecha_nac  = $_POST['fecha_nac'];
		$sexo  = $_POST['sexo'];
		$peso  = $_POST['peso'];
		$talla  = $_POST['talla'];
		$dni_madre  = $_POST['dni_madre'];
		$nombre_madre  = $_POST['nombre_madre'];
		$dni_padre  = $_POST['dni_padre'];
		$nombre_padre  = $_POST['nombre_padre'];
		$direccion  = $_POST['direccion'];
		$telefono  = $_POST['telefono'];

		$q = 'SELECT * FROM tb_eisson_consulta_api 
				WHERE nro_documento = :nro_documento';

		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':nro_documento',  $nro_documento, PDO::PARAM_STR);
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
			$stmt->bindParam(':nombres',  $nombres, PDO::PARAM_STR);
			$stmt->bindParam(':apellido_paterno',  $apellido_paterno, PDO::PARAM_STR);
			$stmt->bindParam(':apellido_materno',  $apellido_materno, PDO::PARAM_STR);
			$stmt->bindParam(':tipo_documento',  $tipo_documento, PDO::PARAM_STR);
			$stmt->bindParam(':nro_documento',  $nro_documento, PDO::PARAM_STR);
			$stmt->bindParam(':fecha_nac',  $fecha_nac, PDO::PARAM_STR);
			$stmt->bindParam(':sexo',  $sexo, PDO::PARAM_STR);
			$stmt->bindParam(':peso',  $peso, PDO::PARAM_STR);
			$stmt->bindParam(':talla',  $talla, PDO::PARAM_STR);
			$stmt->bindParam(':dni_madre',  $dni_madre, PDO::PARAM_STR);
			$stmt->bindParam(':nombre_madre',  $nombre_madre, PDO::PARAM_STR);
			$stmt->bindParam(':dni_padre',  $dni_padre, PDO::PARAM_STR);
			$stmt->bindParam(':nombre_padre',  $nombre_padre, PDO::PARAM_STR);
			$stmt->bindParam(':direccion',  $direccion, PDO::PARAM_STR);
			$stmt->bindParam(':telefono',  $telefono, PDO::PARAM_STR);
			$valor = $stmt->execute();
			
		
			$data  = array('success' =>$valor );


			echo json_encode($data);
		}
?>