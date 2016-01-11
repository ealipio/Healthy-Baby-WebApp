<?php
	require_once('../config/mysql.php');

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	/***
	$q = 'SELECT max(suma) as total from (SELECT count(id_dosis_vacunas) as suma from tb_dosis_vacunas
			group by id_vacuna) as t';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$total= $stmt->fetch(PDO::FETCH_ASSOC);
	$r['total'] = range(1,$total['total']);
	*/
	$q = 'SELECT va.id_vacuna, va.nombre_vacuna, va.observaciones,va.estado, count(ds.id_dosis_vacunas) as nro_dosis
		FROM tb_vacunas va
		LEFT JOIN tb_dosis_vacunas ds on (va.id_vacuna=ds.id_vacuna)
		WHERE va.estado=1 and va.activo = 1 group by va.id_vacuna';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['vacunas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
	$ii = 0;

	foreach ($r['vacunas'] as $v) {
		$q = 'SELECT * from tb_dosis_vacunas
				where id_vacuna=:id_vacuna';
		$stmt = $dbh->prepare($q);
		$stmt->bindParam(':id_vacuna',  $v['id_vacuna'], PDO::PARAM_STR);
		$stmt->execute();
		$dosis = $stmt->fetchAll(PDO::FETCH_ASSOC);

		//var_dump($dosis);
		array_push($r['vacunas'][$ii],  $dosis);

		$ii++;
	}
	//var_dump($r);
	echo json_encode($r);
?>