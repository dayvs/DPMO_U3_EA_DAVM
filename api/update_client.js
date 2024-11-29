const express = require('express');
const pool = require('../db');
const router = express.Router();

router.put('/update_client', async (req, res) => {
  const { id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal } = req.body;

  try {
    const [result] = await pool.execute(
      `UPDATE tbl_clientes SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, sexo = ?, edad = ?, celular = ?, email = ?, sucursal = ? 
       WHERE id_cliente = ?`,
      [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, id_cliente]
    );

    res.status(200).json({ message: 'El cliente fue actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
  }
});

module.exports = router;