const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/insert_client', async (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña } = req.body;

  try {
    const [result] = await pool.execute(
      `INSERT INTO tbl_clientes (nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña]
    );

    res.status(201).json({ message: 'El cliente fue almacenado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al almacenar el cliente', error: error.message });
  }
});

module.exports = router;