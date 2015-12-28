<?php
require_once('config/mysql.php');
$objDatos = json_decode(file_get_contents("php://input"));

$nino=$objDatos->id;
$only_fecha=substr($nino->fecha_nac, 0, 10);
$fechas= explode("-", $only_fecha);
$fecha=$fechas[0].$fechas[1].$fechas[2];

$wsURI      ="http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx?wsdl";
	$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.");
	$fcn_param  = array('sFecha' => $fecha);
	$soapClient = new SoapClient($wsURI);
	$header     = new SoapHeader("http://tempuri.org/", 'credencialcnv', $ws_params);
	$soapClient->__setSoapHeaders($header);
	$soapResult = $soapClient->obtenerCNV_OPS($fcn_param);
	//var_dump($soapResult);
	$resultados=$soapResult->obtenerCNV_OPSResult->CNV;

foreach ($resultados as $k => $v) {
    foreach ($v as $a => $b) {
    	if($a=="NuCnv"){
    	if($b==$nino->numero)  {
			echo json_encode($v) ;
    		}
    	}
}

}

?>