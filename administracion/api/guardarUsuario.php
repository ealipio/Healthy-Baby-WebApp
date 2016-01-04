<?php
	require_once('../../api/config/mysql.php');
	include_once dirname(__FILE__) . '../../api/config/config.php';
	

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();

	session_start();
 	if(isset($_SESSION['id_usuario'])){

	  $rspta = json_decode(file_get_contents("php://input"));
	  $dato= $rspta->usuario;
	  $super = "MINSA";

	  $clave = CLAVE;

		$q = 'INSERT INTO tb_usuarios (`username`,`password`,`nombres`,`apellido_paterno`,`apellido_materno`,`centro_salud`, `activo`, `created_at`, `last_user`) 
				values (:username, AES_ENCRYPT(:password,:llave) , :nombres, :apellido_paterno, :apellido_materno, :centro_salud, 1, CURRENT_TIMESTAMP, :last_user)';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
		$stmt->bindParam(':password',  $dato->username, PDO::PARAM_STR);
		$stmt->bindParam(':nombres',  $dato->nombres, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_paterno',  $dato->apellido_paterno, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_materno',  $dato->apellido_materno, PDO::PARAM_STR);
//condicional para verificar si es superadmin no almacene su centro de salud sino MINSA;
		if($dato->perfiles[0]->id_perfil!=1){
			$stmt->bindParam(':centro_salud',  $dato->centro_salud, PDO::PARAM_STR);}
		else{
			$stmt->bindParam(':centro_salud',  $super, PDO::PARAM_STR);	}

		$stmt->bindParam(':llave',  $clave, PDO::PARAM_STR);
		$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
		$valor = $stmt->execute();
		
		if($valor){
			foreach ($dato->perfiles as $v) {

				$q = 'INSERT INTO tb_usuarios_x_perfil (username, id_perfil, last_user) 
					values (:username, :id_perfil, :last_user)';
			
				$stmt = $dbh->prepare($q);
				$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
				$stmt->bindParam(':id_perfil',  $v->id_perfil, PDO::PARAM_STR);
				$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
				$stmt->execute();
			}
		}
		
		echo json_encode($valor);
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}

?>

