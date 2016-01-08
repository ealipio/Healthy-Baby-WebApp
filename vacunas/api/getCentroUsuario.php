
<?php
  require_once('../../api/config/mysql.php');

  $db  = new EissonConnect();
  $dbh = $db->enchufalo();
	session_start();
	$username = $_SESSION['id_usuario']. '';

	$q = 'SELECT centro_salud from tb_usuarios where username = "'.$username.'";' ;
	$stmt = $dbh->prepare($q);
	$stmt->execute();
	$r = $stmt->fetchAll(PDO::FETCH_ASSOC);

	//var_dump($r);
	echo json_encode($r);

?>