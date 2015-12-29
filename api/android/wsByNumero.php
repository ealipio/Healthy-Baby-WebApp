<?php
	//1000953516
	$response = array('error' => 'No se recibio ningun parametro de busqueda.' );
	if ( isset( $_GET['numero'] )) {
		$numero_cnv  = (int)$_GET['numero'];
		$wsURI       ="http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx?wsdl";
		$client      = new SoapClient($wsURI);
		$header_body = array( 'usuario' => 'wsops1', 'clave' => 'abc123z.');
		$header      = new SoapHeader("http://tempuri.org/", 'credencialcnv', $header_body);
		$client->__setSoapHeaders($header);
		$fcn_param  = array('sNroCNV' => $numero_cnv);
		$r = $client->obtenerCNV_OPS_NroCNV($fcn_param);
		$data = $r->obtenerCNV_OPS_NroCNVResult;
		if ( $data->CNV ) {
			$response = array('success' => $data->CNV );
		} else{
			$response = array('error' => $numero_cnv . ' no se encuentra en la DB.' );
		}
	}
	echo json_encode($response);
?>