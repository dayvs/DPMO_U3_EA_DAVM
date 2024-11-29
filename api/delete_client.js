const pool = require('../db'); // Importar el pool de conexiones

module.exports = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { id_cliente } = req.body;

  try {
    const [result] = await pool.execute('DELETE FROM tbl_clientes WHERE id_cliente = ?', [id_cliente]);
    res.status(200).json({ message: 'El cliente fue eliminado con éxito', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
  }
};