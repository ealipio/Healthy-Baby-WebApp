<?php
	require_once('../../api/config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
  

  	session_start();
	
	if(isset($_SESSION['id_usuario'])){
  
	  $rspta = json_decode(file_get_contents("php://input"));
	  $usuario=$rspta->usuario;
	  $perfil=$rspta->perfiles;

		$q = 'UPDATE tb_usuarios
			SET nombres=:nombres, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, last_user=:last_user
			where username=:username';
		
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':username',  $usuario->username, PDO::PARAM_STR);
		$stmt->bindParam(':nombres',  $usuario->nombres, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_paterno',  $usuario->apellido_paterno, PDO::PARAM_STR);
		$stmt->bindParam(':apellido_materno',  $usuario->apellido_materno, PDO::PARAM_STR);
		//$stmt->bindParam(':centro_salud',  $usuario->centro_salud, PDO::PARAM_STR);
		$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
		$valor = $stmt->execute();
		
		if($valor){
			$q = 'DELETE FROM tb_usuarios_x_perfil where username=:username';
			$stmt = $dbh->prepare($q);
			$stmt->bindParam(':username',  $usuario->username, PDO::PARAM_STR);
			$stmt->execute();

			foreach ($perfil as $v) {
				
				$stmt = $dbh->prepare($q);
				//var_dump($v);
				if($v->valor == 1){
					$q = 'INSERT INTO tb_usuarios_x_perfil (username, id_perfil, last_user) 
					values (:username, :id_perfil, :last_user)';

					$stmt = $dbh->prepare($q);
					$stmt->bindParam(':username',  $usuario->username, PDO::PARAM_STR);
					$stmt->bindParam(':id_perfil',  $v->id_perfil, PDO::PARAM_STR);
					$stmt->bindParam(':last_user',  $_SESSION['id_usuario'], PDO::PARAM_STR);
					$stmt->execute();
				}
			}
		}

		echo json_encode($valor);
	}
	else{
		$valor= FALSE;
		echo json_encode($valor);
	}

?>

