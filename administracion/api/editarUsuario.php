<?php
  require_once('../../api/config/mysql.php');
  include_once dirname(__FILE__) . '../../api/config/config.php';
  
  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $rspta = json_decode(file_get_contents("php://input"));
  $usuario=$rspta->usuario;
  $perfil=$rspta->perfiles;

  //$dato = $_POST['usuario'];

	//var_dump($rspta);
	//var_dump($perfil);
	//var_dump($dato->perfiles);

	$q = 'UPDATE tb_usuarios
		SET nombres=:nombres, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, centro_salud=:centro_salud
		where username=:username';
	
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $usuario->username, PDO::PARAM_STR);
	$stmt->bindParam(':nombres',  $usuario->nombres, PDO::PARAM_STR);
	$stmt->bindParam(':apellido_paterno',  $usuario->apellido_paterno, PDO::PARAM_STR);
	$stmt->bindParam(':apellido_materno',  $usuario->apellido_materno, PDO::PARAM_STR);
	$stmt->bindParam(':centro_salud',  $usuario->centro_salud, PDO::PARAM_STR);
	$stmt->execute();
	$r = $stmt->fetchAll(PDO::FETCH_ASSOC);


	$q = 'DELETE FROM tb_usuarios_x_perfil where username=:username';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $usuario->username, PDO::PARAM_STR);
	$stmt->execute();

	foreach ($perfil as $v) {
		
		$stmt = $dbh->prepare($q);
		var_dump($v);
		if($v->valor == 1){
			$q = 'INSERT INTO tb_usuarios_x_perfil (username, id_perfil) 
			values (:username, :id_perfil)';
			echo "entro:".$v->id_perfil;
			$stmt = $dbh->prepare($q);
			$stmt->bindParam(':username',  $usuario->username, PDO::PARAM_STR);
			$stmt->bindParam(':id_perfil',  $v->id_perfil, PDO::PARAM_STR);
			$stmt->execute();
			$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		
	}


	//var_dump($r);
	echo json_encode($r);

?>

