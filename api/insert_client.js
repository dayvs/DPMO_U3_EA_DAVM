const pool = require('../db'); // Importar el pool de conexiones

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña } = req.body;

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO tbl_clientes (nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña]
    );

    res.status(200).json({ message: 'El cliente fue almacenado con éxito', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al almacenar el cliente', error: error.message });
  }
};