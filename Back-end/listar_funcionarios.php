<?php

include 'cors.php';
include 'conexão.php';


if($_server["REQUEST_METHOD"] == "GET") {
    $funcionarios = [];
    while($row = $result->fetch_assoc()) {
        array_push($funcionarios, $row);
    }

    $response = [
        'funcionarios' => $funcionarios
    ];
} else {
    $response = [
        'funcionarios' => 'nenhum registro encontrado!'

    ];
}

echo json_encode($response);
?>