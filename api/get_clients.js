const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/get_clients', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal FROM tbl_clientes'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
  }
});

module.exports = router;