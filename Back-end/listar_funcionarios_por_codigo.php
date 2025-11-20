<?php
include 'cors.php';
include 'conexao.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtém o corpo da solicitação POST
    $data = file_get_contents("php://input");

    // Decodifica o JSON par aum objeto PHP
    $requestData = json_decode($data, true);

    // Agora você pode acessar os dados enviados
    $codigo = $requestData->CodFun;

    //Colocar o banco de dados Assim que possivel
    //colocar o ID da tabela e do banco de dados
    $sql = "SELECT  * FROM "
}

?>