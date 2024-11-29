const express = require('express');
const pool = require('../db');
const router = express.Router();

router.put('/update_client', async (req, res) => {
  const { id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tbl_clientes SET 
       nombre = $1, apellido_paterno = $2, apellido_materno = $3, sexo = $4, 
       edad = $5, celular = $6, email = $7, sucursal = $8 
       WHERE id_cliente = $9 RETURNING *`,
      [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, id_cliente]
    );

    res.status(200).json({ message: 'El cliente fue actualizado con éxito', cliente: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
  }
});

module.exports = router;