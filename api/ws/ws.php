<?php
	
	$wsURI      ="http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx?wsdl"; 
	$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.");
	//$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.", 'sFecha' => "20151110");
	//$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.", 'sFecha' => "20151110");
	$fcn_param  = array('sFecha' => "20151030");
	//$soapClient = new SoapClient($wsURI);
	$soapClient = new SoapClient($wsURI);
	$header     = new SoapHeader("http://tempuri.org/", 'credencialcnv', $ws_params);
	//$header     = new SoapHeader($wsURI, 'credencialcnv', $ws_params);
	$soapClient->__setSoapHeaders($header);
	//$soapResult = $soapClient->__soapCall("obtenerCNV", array(null));
	//$soapResult = $soapClient->__soapCall("obtenerCNV", array(null));
	//$soapResult = $soapClient->__soapCall("obtenerCNV", $fcn_param);
	//$soapResult = $soapClient->__soapCall("credencialcnv", $ws_params);
	$soapResult = $soapClient->obtenerCNV_OPS($fcn_param);
	echo json_encode($soapResult);
?>