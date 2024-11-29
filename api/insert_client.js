const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.post('/insert_client', async (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña } = req.body;

    // Validar formato de email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
    }

    try {
        const connection = await mysql.createConnection({
            host: 'sql106.infinityfree.com',
            user: 'if0_37779872',
            password: 'IoyZ6Zv32S5bW9',
            database: 'if0_37779872_db_formula1',
        });

        const [result] = await connection.execute(
            `INSERT INTO tbl_clientes (nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contraseña]
        );

        await connection.end();
        res.status(200).json({ message: 'El cliente fue almacenado con éxito', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al almacenar el cliente', error: error.message });
    }
});

module.exports = router;