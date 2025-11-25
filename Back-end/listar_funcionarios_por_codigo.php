<?php

include 'cors.php';
include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Obtém o corpo da solicitação POST
$data = file_get_contents("php://input");

// Decodifica o JSON para um objeto PHP
$requestData = json_decode($data);

// Agora você pode acessar os dados usando $requestData
$codigo = $requestData->CodFun;

// selecione da tabela funcionarios o codigo
$sql = "SELECT * FROM Funcionarios WHERE CodFun = '$codigo'";

//o resultado pe a conexão do sql
$result = $connection->query($sql);

//se o numero de linhas for maior que zero ele
//cria im arrau e coloca funcionarios e linhas no inicio doarray
if ($result->num_rows > 0) {
    $funcionarios = [];
    while ($row = $result->fetch_assoc()) {
        array_push($funcionarios, $row);
    }

    //resposta do array
    $response = [
        'funcionarios' => $funcionarios
    ];

} else {
    //resposta alternada
    $response = [
        'funcionarios' => 'Nenhum registro encontrado!'
    ];
}

echo json_encode($response);
} // Fim If
?>