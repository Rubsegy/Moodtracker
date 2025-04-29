<?php
require_once '../connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['estado'])) {
    $estado = substr($_POST['estado'],0,50);
    $fecha  = date('Y-m-d');                
    $stmt   = $conn->prepare(
        "INSERT INTO estats_anims (estat, data) VALUES (?, ?)"
    );
    $stmt->bind_param('ss',$estado,$fecha);
    $stmt->execute();
    echo "ok";
    exit;
}

if (isset($_GET['resumen'])) {
    $desde = $_GET['desde'] ?: date('Y-m-d');
    $hasta = $_GET['hasta'] ?: $desde;

    $stmt = $conn->prepare(
        "SELECT estat AS estado, COUNT(*) AS total
         FROM estats_anims
         WHERE data BETWEEN ? AND ?
         GROUP BY estat"
    );
    $stmt->bind_param('ss',$desde,$hasta);
    $stmt->execute();
    $res  = $stmt->get_result();

    $datos = [];
    while ($fila = $res->fetch_assoc()) $datos[] = $fila;

    header('Content-Type: application/json');
    echo json_encode($datos);
    exit;
}

http_response_code(400);
echo "Petición no válida";
