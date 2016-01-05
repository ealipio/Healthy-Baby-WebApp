<?php
	$wsURI      ="http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx?wsdl";
	$client = new SoapClient($wsURI);
	$header_body = array( 'usuario' => 'wsops1', 'clave' => 'abc123z.');
	$header = new SoapHeader("http://tempuri.org/", 'credencialcnv', $header_body);
	$client->__setSoapHeaders($header);
	$fcn_param  = array('sNroCNV' => "1000953516");
	$r = $client->obtenerCNV_OPS_NroCNV($fcn_param);

	var_dump($r, 'hola');
?>