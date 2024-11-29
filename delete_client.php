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

// Leer datos enviados desde la aplicación móvil (DELETE)
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data)) {
    $id_cliente = $data['id_cliente'];

    // Eliminar cliente
    $sql = "DELETE FROM tbl_clientes WHERE id_cliente=$id_cliente";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "El cliente fue eliminado con éxito"]);
    } else {
        echo json_encode(["message" => "Error al eliminar el cliente: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Datos no recibidos"]);
}

// Cerrar conexión
$conn->close();
?>