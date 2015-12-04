<?php
  require_once('config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
/*
  	$q = 'SELECT max(suma) as total from (SELECT count(id_dosis_vacunas) as suma from tb_dosis_vacunas
			group by id_vacuna) as t';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$total = $stmt->fetch(PDO::FETCH_ASSOC);


	$q = 'SELECT va.id_vacuna, va.nombre_vacuna, va.observaciones,
			ds.id_dosis_vacunas, ds.nombre_dosis, ds.meses
			from tb_vacunas va
			INNER JOIN tb_dosis_vacunas ds on (va.id_vacuna=ds.id_vacuna)';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$vacunas_tmp = $stmt->fetchAll(PDO::FETCH_ASSOC);
*/
/*
array(5) {
    ["id_dosis_vacunas"]=>
    int(2)
    ["nombre_dosis"]=>
    string(3) "2da"
    ["meses"]=>
    int(3)
    ["id_vacuna"]=>
    int(1)
    ["created_at"]=>
    string(19) "2015-12-03 09:52:39"
  }

	if( $total < 5){
//
	}
	$id_v=0;
	$id_vtemp=0;
	$cont=0;

	foreach ($vacunas_tmp as $v) {
		
		$s=$v['id_vacuna'];
		$r['vacunas']["vacuna_$s"][]=$v;
			

	}
*/

	$q = 'SELECT max(suma) as total from (SELECT count(id_dosis_vacunas) as suma from tb_dosis_vacunas
			group by id_vacuna) as t';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$total= $stmt->fetch(PDO::FETCH_ASSOC);
	
	$r['total'] = range(1,$total['total']);

	$q = 'SELECT va.id_vacuna, va.nombre_vacuna, va.observaciones, count(ds.id_dosis_vacunas) as nro_dosis
		FROM tb_vacunas va
		INNER JOIN tb_dosis_vacunas ds on (va.id_vacuna=ds.id_vacuna)
		group by va.id_vacuna';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['vacunas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	$q = 'SELECT * from tb_dosis_vacunas';
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r['dosis'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

	foreach ($r['vacunas'] as $v) {

		$falta=  $total['total'] - $v['nro_dosis'];
		$arr = array('id_vacuna' => $v['id_vacuna'], 'nombre_dosis'=>'');

		for($i=0; $i < $falta; $i++){
			array_push($r['dosis'], $arr);
		}
	}

	//var_dump($r);
	//echo json_encode($r);

	echo json_encode($r);
?>