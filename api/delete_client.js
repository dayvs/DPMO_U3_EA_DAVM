const express = require('express');
const pool = require('../db'); // Importar el pool de conexiones
const router = express.Router();

router.delete('/delete_client/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM tbl_clientes WHERE id_cliente = ?', [id]);
    res.status(200).json({ message: 'El cliente fue eliminado con éxito', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
  }
});

module.exports = router;