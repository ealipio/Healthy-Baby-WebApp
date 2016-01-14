<?php
	require_once('config/mysql.php');
	$db        = new EissonConnect();
	$dbh       = $db->enchufalo();
	//---------------------------------------------------------
	$dato      = $_POST['data'];
	$fecha_nac = $dato['FechaNac'];
	$id_nino   = $dato['NuCnv'];
	//---------------------------------------------------------
	$q = 'SELECT max(suma) as total from
		(SELECT count(dv.id_dosis_vacunas) as suma
		 from tb_dosis_vacunas dv inner join tb_vacunas va on dv.id_vacuna=va.id_vacuna
		 where va.estado=1
		group by dv.id_vacuna) as t';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$total= $stmt->fetch(PDO::FETCH_ASSOC);

	$r['total'] = range(1,$total['total']);

	$q = 'SELECT va.id_vacuna, va.nombre_vacuna, va.observaciones,va.estado, count(ds.id_dosis_vacunas) as nro_dosis
		FROM tb_vacunas va
		LEFT JOIN tb_dosis_vacunas ds on (va.id_vacuna=ds.id_vacuna)
		WHERE va.estado=1
		group by va.id_vacuna';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['vacunas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$q = 'SELECT * , DATE_ADD(:fecha_nacimiento, INTERVAL meses MONTH) as fecha_estimada, 0 as  vacunado, IF(datediff(now(), DATE_ADD(:fecha_nacimiento1, INTERVAL meses MONTH))<0,1,2) as estimado
			from tb_dosis_vacunas';

	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':fecha_nacimiento',  $fecha_nac, PDO::PARAM_STR);
	$stmt->bindParam(':fecha_nacimiento1',  $fecha_nac, PDO::PARAM_STR);
	$stmt->execute();

	$r['dosis'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	
	// metiendo informacion en blanco sobre dosis para parsear columnas
	foreach ($r['vacunas'] as $v) {

		$falta=  $total['total'] - $v['nro_dosis'];
		$arr = array('id_vacuna' => $v['id_vacuna'], 'nombre_dosis'=>'', 'id_dosis_vacunas'=>'');

		for($i=0; $i < $falta; $i++){
			array_push($r['dosis'], $arr);
		}
	}

	$q = 'SELECT * from tb_vacunas_x_ninos
			WHERE id_nino =:id_nino';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $id_nino, PDO::PARAM_STR);
	$stmt->execute();

	$r['vacuanasNino'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$ii = 0;
	foreach ($r['dosis'] as $v) {
		$tmpActivo=0;
		foreach ($r['vacuanasNino'] as $w) {

			if($v['id_dosis_vacunas'] == $w['id_dosis_vacunas']){
				$r['dosis'][$ii]['vacunado'] = 1;
			}
		}
		$ii++;
	}
	echo json_encode($r);
?>