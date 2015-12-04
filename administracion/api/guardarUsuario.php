<?php
  require_once('config/mysql.php');
  include_once dirname(__FILE__) . '\config\config.php';
  
  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $rspta = json_decode(file_get_contents("php://input"));
  $dato=$rspta->usuario;

  $clave = CLAVE;

  //$dato = $_POST['usuario'];

	//var_dump($clave);
	//var_dump($dato->perfiles);


	$q = 'INSERT INTO tb_usuarios (`username`,`password`,`nombres`,`apellido_paterno`,`apellido_materno`,`centro_salud`,`created_at`) 
			values (:username, AES_ENCRYPT(:password,:llave) , :nombres, :apellido_paterno, :apellido_materno, :centro_salud, CURRENT_TIMESTAMP)';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
	$stmt->bindParam(':password',  $dato->username, PDO::PARAM_STR);
	$stmt->bindParam(':nombres',  $dato->nombres, PDO::PARAM_STR);
	$stmt->bindParam(':apellido_paterno',  $dato->apellido_paterno, PDO::PARAM_STR);
	$stmt->bindParam(':apellido_materno',  $dato->apellido_materno, PDO::PARAM_STR);
	$stmt->bindParam(':centro_salud',  $dato->centro_salud, PDO::PARAM_STR);
	$stmt->bindParam(':llave',  $clave, PDO::PARAM_STR);
	$stmt->execute();
	$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

	foreach ($dato->perfiles as $v) {

		$q = 'INSERT INTO tb_usuarios_x_perfil (username, id_perfil) 
			values (:username, :id_perfil)';
	
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
		$stmt->bindParam(':id_perfil',  $v->id_perfil, PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
	}


	//var_dump($r);
	echo json_encode($r);

?>

