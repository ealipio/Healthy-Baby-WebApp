<?php

	require_once'../config/mysql.php';

	include_once '../config/config.php';

	if ( count($_POST) == 0 ) {

		$data  = array('error' => 'No se recibieron credenciales.' );

	} else{

		$data     = array('error' => 'Credenciales Incorrectas' );
		$usuario  = $_POST['username'];
		$password = $_POST['password'];
		$llave    = CLAVE;
		$db       = new EissonConnect();
		$dbh      = $db->enchufalo();
		$q        = 'SELECT username, nombres, centro_salud FROM tb_usuarios WHERE username = :username AND password = AES_ENCRYPT(:password, :llave) and activo=1';
		$stmt     = $dbh->prepare($q);
		$stmt->bindParam(':username', $usuario,PDO::PARAM_STR);
		$stmt->bindParam(':password', $password,PDO::PARAM_STR);
		$stmt->bindParam(':llave', $llave,PDO::PARAM_STR);
		$stmt->execute();
		$r = $stmt->fetch(PDO::FETCH_ASSOC);

		if ( $r ) {

			$q = 'SELECT id_perfil FROM tb_usuarios_x_perfil WHERE username = :username and id_perfil = 3';

			$stmt = $dbh->prepare($q);

			$stmt->bindParam(':username',$usuario,PDO::PARAM_STR);

			$stmt->execute();

			$rr = $stmt->fetch(PDO::FETCH_ASSOC);

			if ( $rr ) {

				$data  = array('success' => $r );

			} else {

				$data  = array('error' => 'El usuario no tiene asignado un perfil de profesional de la salud.' );

			}

		}

	}

	echo json_encode($data);

?>