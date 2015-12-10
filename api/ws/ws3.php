<?php

/*
	wscnv.wscnv ws = new wscnv.wscnv();
	wscnv.CredencialCNV oCredencial = new wscnv.CredencialCNV();
	oCredencial.usuario = "usuario123";
	oCredencial.clave = "clave123";
	ws.CredencialCNVValue = oCredencial;
	Array listCNV = null;
	listCNV = ws.obtenerCNV(txtFecha.Text);
*/
	$wsdl1 = "http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx?wsdl";
	$wsdl2 = "http://www.webservicex.com/globalweather.asmx?wsdl";
	$ns = "http://tempuri.org/";
	//$ws_params  = array('login' => "wsops1", 'password' => "abc123z.");
	$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.");
	//$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.", 'sFecha' => "20151110");
	//$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.", 'sFecha' => "20151110");
	$fcn_param  = array('sFecha' => "20151110");
	$client = new SoapClient($wsdl, array( "trace" => 1, "exceptions" => 0 ));
	//$soap_options = array( 'login' => 'username',  'password' => 'password' );
	//$client = new SoapClient($wsURI1);
	//$client = new SoapClient($wsURI2, $ws_params);
	//$client = new SoapClient($wsURI1, $ws_params);
	//$ns = "http://tempuri.org/";
	//$header     = new SoapHeader("http://tempuri.org/", 'credencialcnv', $ws_params);
	//$header     = new SoapHeader($ns2, 'CredencialCNV', $ws_params);

    $login = 'wsops1';
    $password = 'abc123z.';
    //$ws_params  = array('usuario' => "wsops1", 'clave' => "abc123z.");
    //$headerBody = array('AuthentificationInfo'=>array( 'login' => $login, 'password' => $password, 'accountID' => $partnerID ));
 	$headerBody = array( 'usuario' => $login, 'clave' => $password);
	//$header     = new SoapHeader($ns, 'CredencialCNVValue', $ws_params);
	//$header = new SoapHeader($ns, 'AuthentificationInfo', $headerBody);
	//$header = new SoapHeader("http://tempuri.org/", 'CredencialCNVValue', $headerBody);
	//$header = new SoapHeader("http://tempuri.org/", 'CredencialCNV', $headerBody);
	$header = new SoapHeader("http://tempuri.org/CredencialCNV", 'CredencialCNVValue', $headerBody);
    $client->__setSoapHeaders($header);
    //$client->__soapCall("echoVoid", array(null));
	//$header     = new SoapHeader($wsURI1, 'credencialcnv', $ws_params);
	//$client->__setSoapHeaders($header);
	//$soapResult = $soapClient->__soapCall("obtenerCNV", array(null));
	//$soapResult = $soapClient->__soapCall("obtenerCNV", array(null));
	//$soapResult = $soapClient->__soapCall("obtenerCNV", $fcn_param);
	//$soapResult = $soapClient->__soapCall("credencialcnv", $ws_params);
	//$soapResult = $soapClient->credencialcnv($ws_params);
	//$soapResult = $soapClient->credencialcnvValue($ws_params);
	//$fcs = $client->__getFunctions();
  	//obtenerCNVResponse obtenerCNV(obtenerCNV $parameters)
  	//obtenerCNV_OPSResponse obtenerCNV_OPS(obtenerCNV_OPS $parameters)

	//$res = $client->GetWeather(array('CityName' => 'Lima', 'CountryName' => 'Peru'));
	//$res = $client->GetWeather(array('CityName' => 'Lagos', 'CountryName' => 'Nigeria'));
	//$res = $client->obtenerCNV(array('CityName' => 'Lagos', 'CountryName' => 'Nigeria'));
	//$res = $client->obtenerCNV_OPS(array("sFecha"=>"20151110"));
	var_dump($res);
	//var_dump($soapResult);
	//GetWeatherResponse GetWeather(GetWeather $parameters)
	//GetCitiesByCountryResponse GetCitiesByCountry(GetCitiesByCountry $parameters)
	//var_dump($fcs);
	//var_dump($res->GetWeatherResult);
	//$ele = new SimpleXMLElement($res->GetWeatherResult);
	//echo $res->GetWeatherResult;
	//var_dump($ele);
?>