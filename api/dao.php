<?php
class DAO{

	function getCentros(){
		require_once('config/mysql.php');
		$db              = new EissonConnect();
		$dbh             = $db->enchufalo();
		$q = 'SELECT * from tb_centros ';
		$stmt = $dbh->prepare($q);
		$stmt->execute();
		$r = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($r);
	}
}
?>