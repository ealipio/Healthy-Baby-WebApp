<?php
  require_once('../../api/config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();

	$q = 'SELECT username,nombres,apellido_paterno,apellido_materno,centro_salud from tb_usuarios';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['usuarios'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$q = 'SELECT id_perfil, nombre_perfil from tb_perfiles';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['perfiles'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	//var_dump($r);
	echo json_encode($r);

?>