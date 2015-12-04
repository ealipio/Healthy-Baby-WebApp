<?php
  require_once('config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $dato = json_decode(file_get_contents("php://input"));

	//var_dump($dato);

	$q = 'SELECT username,nombres,apellido_paterno,apellido_materno,centro_salud 
		from tb_usuarios
		WHERE username = :username';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
	$stmt->execute();
	$r['usuarios'] = $stmt->fetch(PDO::FETCH_ASSOC);

	$q = 'SELECT pf.id_perfil, pf.nombre_perfil
			FROM tb_perfiles pf
			INNER JOIN tb_usuarios_x_perfil upf on pf.id_perfil=upf.id_perfil
			WHERE upf.username= :username';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
	$stmt->execute();
	$r['perfiles'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	//var_dump($r);
	echo json_encode($r);

?>