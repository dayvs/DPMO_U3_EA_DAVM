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

// Leer datos enviados desde la aplicación móvil (PUT)
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data)) {
    $id_cliente = $data['id_cliente'];
    $nombre = $data['nombre'];
    $apellido_paterno = $data['apellido_paterno'];
    $apellido_materno = $data['apellido_materno'];
    $sexo = $data['sexo'];
    $edad = $data['edad'];
    $celular = $data['celular'];
    $email = $data['email'];
    $sucursal = $data['sucursal'];

    // Actualizar cliente
    $sql = "UPDATE tbl_clientes SET 
                nombre='$nombre', 
                apellido_paterno='$apellido_paterno', 
                apellido_materno='$apellido_materno', 
                sexo='$sexo', 
                edad=$edad, 
                celular='$celular', 
                email='$email', 
                sucursal='$sucursal' 
            WHERE id_cliente=$id_cliente";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "El cliente fue actualizado con éxito"]);
    } else {
        echo json_encode(["message" => "Error al actualizar el cliente: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Datos no recibidos"]);
}

// Cerrar conexión
$conn->close();
?>