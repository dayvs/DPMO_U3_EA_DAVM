const express = require('express');
const pool = require('../db');
const router = express.Router();

router.delete('/delete_client', async (req, res) => {
  const { id_cliente } = req.body;

  try {
    await pool.query(
      'DELETE FROM tbl_clientes WHERE id_cliente = $1',
      [id_cliente]
    );

    res.status(200).json({ message: 'El cliente fue eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
  }
});

module.exports = router;