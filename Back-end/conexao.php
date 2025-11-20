<?php

$host = "Localhost";
$usuario = "root";
$senha = "";
//colocar aqui o banco de dados dps
$database = "Arquivo.sql";


//criacao da conexao do mysql
//pedir opinião e terminar
$connection = new mysqli();

if($connection->connect_error) {
    die("conexão falhou: " . $connection-connect_error);
}

?>