<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "mood"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("No se puede conectar con la base de datos: " . $conn->connect_error);
} else {
    // echo "Conexión exitosa a la base de datos.";
}   

?>