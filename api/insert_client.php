<?php
// Configuración de conexión a la base de datos
$host = "sql106.infinityfree.com";
$dbname = "if0_37779872_db_formula1";
$username = "if0_37779872";
$password = "IoyZ6Zv32S5bW9";

try {
    // Conectar a la base de datos
    $conn = new mysqli($host, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        throw new Exception("Error de conexión a la base de datos: " . $conn->connect_error);
    }

    // Leer datos enviados desde la aplicación móvil (POST)
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data)) {
        $nombre = $data['nombre'];
        $apellido_paterno = $data['apellido_paterno'];
        $apellido_materno = $data['apellido_materno'];
        $sexo = $data['sexo'];
        $edad = intval($data['edad']); // Convertir edad a entero
        $celular = $data['celular'];
        $email = $data['email'];
        $sucursal = $data['sucursal'];
        $contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT); // Encriptar la contraseña

        // Validar el formato del email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("El formato del email es inválido.");
        }

        // Insertar datos en la base de datos
        $sql = "INSERT INTO tbl_clientes (nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña) 
                VALUES ('$nombre', '$apellido_paterno', '$apellido_materno', '$sexo', $edad, '$celular', '$email', '$sucursal', '$contraseña')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "El cliente fue almacenado con éxito"]);
        } else {
            throw new Exception("Error al almacenar el cliente: " . $conn->error);
        }
    } else {
        throw new Exception("Datos no recibidos en la solicitud.");
    }
} catch (Exception $e) {
    http_response_code(500); // Establecer el código de respuesta HTTP
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    if (isset($conn) && $conn->connect_error == null) {
        $conn->close();
    }
}
?>