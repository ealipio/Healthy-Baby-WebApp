<?php

/**
 * Handling database connection
 *
 * @author Eisson
 */
class EissonConnect {

    private $dbh;

    function __construct() { }

    /**
     * Establishing database connection
     * @return database connection handler
     */
    function enchufalo() {
        include_once dirname(__FILE__) . '/config.php';

        $dataSourceName = "mysql:host=".DB_HOST.";dbname=".DB_NAME;
        $options        = array(
                            PDO::ATTR_EMULATE_PREPARES   => false,
                            PDO::ATTR_PERSISTENT         => true,
                            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION
                            );
        try {
            $this->dbh = new PDO($dataSourceName, DB_USERNAME, DB_PASSWORD, $options);
        } catch (PDOException $e) {
            $response = array('error' => $e->getMessage(), 'database' => 'Error al intentar conectarse a la base de Datos' );
            echo json_encode($response);
            exit;
        }
        return $this->dbh;
    }
}

?>