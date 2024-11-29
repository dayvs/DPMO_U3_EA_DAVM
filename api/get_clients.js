const pool = require('../db'); // Importar el pool de conexiones

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal FROM tbl_clientes'
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
  }
};