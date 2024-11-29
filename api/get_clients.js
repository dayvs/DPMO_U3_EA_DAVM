const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.get('/get_clients', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'sql106.infinityfree.com',
            user: 'if0_37779872',
            password: 'IoyZ6Zv32S5bW9',
            database: 'if0_37779872_db_formula1',
        });

        const [rows] = await connection.execute(
            'SELECT id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal FROM tbl_clientes'
        );

        await connection.end();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
});

module.exports = router;