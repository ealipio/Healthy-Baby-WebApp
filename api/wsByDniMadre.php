<?php
	//42579084
	//41225079
	$response = array('error' => 'No se recibio ningun parametro de busqueda.' );
	if ( isset( $_GET['numero'] )) {
		$numero_cnv  = (int)$_GET['numero'];
		try {
			$wsURI       ="http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx?wsdl";
			$client      = new SoapClient($wsURI);
			$header_body = array( 'usuario' => 'wsops1', 'clave' => 'abc123z.');
			$header      = new SoapHeader("http://tempuri.org/", 'credencialcnv', $header_body);
			$client->__setSoapHeaders($header);
			$fcn_param  = array('sNroDNI' => $numero_cnv);
			$r = $client->obtenerCNV_OPS_NroDNI($fcn_param);
			$data = $r->obtenerCNV_OPS_NroDNIResult;
			if ( isset($data->CNV) ) {
				$response = array('success' => $data->CNV );
			} else{
				$response = array('error' => 'No se encontro el numero de documento ' . $numero_cnv . ' en la Base de Datos.' );
			}
		} catch (Exception $e) {
			$response = array('error' => 'Lo lamento, No se pudo conectar al WebService, intentelo mas tarde.' );
		}

	}
	echo json_encode($response);
?>