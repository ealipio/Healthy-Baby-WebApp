<?php

$client = new SoapClient("http://ws_min.minsa.gob.pe/ws_cnv/wscnv.asmx");
//usuario: wsops1
//password: abc123z.

$client = new SoapClient('http://www.example.com/services/RecipeCouponAPI11.asmx?wsdl');
$header = new SoapHeader('http://www.example.com/services/','RCAuthenticator', array('UserName' => 'username', 'Password' => 'password' ) );
$client->__setSoapHeaders($header);
$response = $client->GetCouponAll(array('campaignCode' => ''));

?>