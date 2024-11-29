const pool = require('../db'); // Importar el pool de conexiones

module.exports = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal } = req.body;

  try {
    const [result] = await pool.execute(
      `UPDATE tbl_clientes SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, sexo = ?, edad = ?, celular = ?, email = ?, sucursal = ? 
       WHERE id_cliente = ?`,
      [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, id_cliente]
    );

    res.status(200).json({ message: 'El cliente fue actualizado con éxito', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
  }
};