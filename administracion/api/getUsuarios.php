<?php
  require_once('../../api/config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();

	$q = 'SELECT username,nombres,apellido_paterno,apellido_materno,centro_salud
		from tb_usuarios where activo=1';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['usuarios'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
	

	$q = 'SELECT id_perfil, nombre_perfil from tb_perfiles';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['perfiles'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$cont=0;
	foreach ($r['usuarios'] as $v) {
		$r['usuarios'][$cont]['perfil']=array();
		$q = 'SELECT upp.username, upp.id_perfil, pe.nombre_perfil
				FROM tb_usuarios_x_perfil upp
				LEFT JOIN tb_perfiles pe on upp.id_perfil=pe.id_perfil
				WHERE username=:username';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':username',  $v['username'], PDO::PARAM_INT);
		$stmt->execute();
		$rr = $stmt->fetchAll(PDO::FETCH_ASSOC);
		//echo "resultado:\n";
		//var_dump($rr);
		foreach ($rr as $w) {
			$arr = array('username' => $v['username'], 'id_perfil'=>$w['id_perfil'], 'nombre_perfil'=>$w['nombre_perfil']);
			//echo "arr:\n";
			//var_dump($arr);
			array_push($r['usuarios'][$cont]['perfil'], $arr);
		}
		$cont++;
	}


	//var_dump($r);
	echo json_encode($r);

?>