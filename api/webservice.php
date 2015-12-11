<?php

require_once('config/mysql.php');
//select fecha_nac as nacimiento, CURRENT_TIMESTAMP,TIMESTAMPDIFF(MONTH,fecha_nac, CURRENT_TIMESTAMP) as edad_in_days from tb_eisson_consulta_api
$r = array('error' => 'Lo siento, los parametros son incorrectos.' );

if( isset( $_GET['nro_documento'] ) ){
	//
	$nro_documento = $_GET['nro_documento'];

	$db  = new EissonConnect();
	$dbh = $db->enchufalo();
	$q = 'SELECT * FROM tb_eisson_consulta_api WHERE nro_documento = :nro_documento';
	$stmt = $dbh->prepare($q);
	$stmt->bindParam(':nro_documento',  $nro_documento, PDO::PARAM_STR);
	$stmt->execute();
	$r = $stmt->fetch(PDO::FETCH_ASSOC);
	if(!$r){
		$r = array('error' => 'Lo lamento, no hubo resultados para esta busqueda.' );
	}

}

echo json_encode($r);

?>