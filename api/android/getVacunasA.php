<?php
	require_once('../config/mysql.php');
	$db        = new EissonConnect();
	$dbh       = $db->enchufalo();
	//---------------------------------------------------------
	$data      = $_POST['data'];
	$fecha_nac = $data['FecNac'];
	$id_nino   = $data['NuCnv'];
	//$fecha_nac = "2015-01-15";
	//$id_nino   = "1000999595";
	//---------------------------------------------------------

	// Trayendo todas las dosis de las vacunas y calculando fecha estimada de vacunación de acuerdo a fecha de nacimiento
	$q = 'SELECT va.nombre_vacuna, ds.id_dosis_vacunas, ds.nombre_dosis, ds.meses, ds.id_vacuna,
			DATE_ADD(:fecha_nacimiento, INTERVAL meses MONTH) as fecha_estimada, 0 as  vacunado, IF(datediff(now(), DATE_ADD(:fecha_nacimiento1, INTERVAL meses MONTH))<0,1,2) as estimado
			FROM tb_dosis_vacunas ds
			INNER JOIN tb_vacunas va on ds.id_vacuna=va.id_vacuna
			WHERE va.estado=1 and va.activo = 1
			order by meses';

	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':fecha_nacimiento',  $fecha_nac, PDO::PARAM_STR);
	$stmt->bindParam(':fecha_nacimiento1',  $fecha_nac, PDO::PARAM_STR);
	$stmt->execute();
	$dosis = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$q = 'SELECT * from tb_vacunas_x_ninos WHERE id_nino =:id_nino';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':id_nino',  $id_nino, PDO::PARAM_STR);
	$stmt->execute();
	$r['vacunasNino'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$ii         = 0;
	$tiempo     = 0;
	$contTiempo = 0;
	$vacunas    = array();
	$tmpvacunas = array();

	foreach ($dosis as $v) {
		$tmpActivo=0;
		foreach ($r['vacunasNino'] as $w) {
			if($v['id_dosis_vacunas'] == $w['id_dosis_vacunas']){
				$dosis[$ii]['vacunado'] = 1;
				$dosis[$ii]['fecha_vacunacion'] = $w['fecha_vacunacion'];
			}
		}
		if($tiempo == $dosis[$ii]['meses']){
			array_push( $tmpvacunas, $dosis[$ii]);
		}
		else{
			if($ii>0){
				array_push( $vacunas, array('contenido' => $tmpvacunas, 'meses' => $tiempo ));
				$tmpvacunas = array();
			}
			array_push( $tmpvacunas, $dosis[$ii]);
		}
		$tiempo = $dosis[$ii]['meses'];
		$ii++;
	}
	array_push( $vacunas, array('contenido' => $tmpvacunas, 'meses' => $tiempo ));
	echo json_encode($vacunas);
?>