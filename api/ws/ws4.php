 <?php

	$ws_params = array('usuario' => "admin", 'clave' => "123456");
	$client = new SoapClient("http://ws_min.mindtec.ar/ws_cnv/wscnv.asmx?wsdl");
	$header    = new SoapHeader("http://tempuri.org/", 'credencialcnv', $ws_params);
	$client->__setSoapHeaders($header);
	$res = $client->obtenerCNV_OPS(array("sFecha"=>"20151110"));
	var_dump($res);

	/*** obtengo esto:

 object(stdClass)#3 (1) {
  ["obtenerCNV_OPSResult"]=>
  object(stdClass)#4 (0) {
  }
}

	*/
 ?>