const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/insert_client', async (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tbl_clientes (nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña]
    );

    res.status(201).json({ message: 'El cliente fue almacenado con éxito', cliente: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error al almacenar el cliente', error: error.message });
  }
});

module.exports = router;