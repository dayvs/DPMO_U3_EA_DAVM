<?php
// Configuración de conexión a la base de datos
$host = "sql106.infinityfree.com";
$dbname = "if0_37779872_db_formula1";
$username = "if0_37779872";
$password = "IoyZ6Zv32S5bW9";

// Conectar a la base de datos
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consultar todos los clientes
$sql = "SELECT id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal FROM tbl_clientes";
$result = $conn->query($sql);

$clientes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }
    echo json_encode($clientes);
} else {
    echo json_encode(["message" => "No se encontraron clientes"]);
}

// Cerrar conexión
$conn->close();
?>