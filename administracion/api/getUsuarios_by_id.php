<?php
  require_once('../../api/config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
  $dato = json_decode(file_get_contents("php://input"));

	//var_dump($dato);

	$q = 'SELECT username,nombres,apellido_paterno,apellido_materno 
		from tb_usuarios
		WHERE username = :username';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
	$stmt->execute();
	$r['usuarios'] = $stmt->fetch(PDO::FETCH_ASSOC);

	$q = 'SELECT pf.id_perfil, pf.nombre_perfil, upf.username
			FROM tb_perfiles pf
			CROSS JOIN tb_usuarios_x_perfil upf on pf.id_perfil=upf.id_perfil
			WHERE upf.username= :username';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':username',  $dato->username, PDO::PARAM_STR);
	$stmt->execute();
	$r1['perfil'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$q = 'SELECT id_perfil, nombre_perfil, 0 as valor
			FROM tb_perfiles';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r1['perfiles'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$r['perfiles']=[];
	foreach ($r1['perfiles'] as $v1) {
		$valor=0;
		$usuario="";
		foreach ($r1['perfil'] as $v2) {
			if($v1['id_perfil']==$v2['id_perfil']){
				$valor=1;
				$usuario=$v2['username'];
			};
		}	

		$arr = array('id_perfil' => $v1['id_perfil'], 'nombre_perfil' => $v1['nombre_perfil'], 'valor' => $valor, 'username' => $usuario);
		//var_dump($arr);
		array_push($r['perfiles'], $arr);
	}

	//var_dump($r);
	echo json_encode($r);

?>