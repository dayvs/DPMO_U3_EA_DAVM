const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.put('/update_client', async (req, res) => {
    const { id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: 'sql106.infinityfree.com',
            user: 'if0_37779872',
            password: 'IoyZ6Zv32S5bW9',
            database: 'if0_37779872_db_formula1',
        });

        const [result] = await connection.execute(
            `UPDATE tbl_clientes SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, sexo = ?, edad = ?, celular = ?, email = ?, sucursal = ? 
             WHERE id_cliente = ?`,
            [nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, id_cliente]
        );

        await connection.end();
        res.status(200).json({ message: 'El cliente fue actualizado con éxito', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
});

module.exports = router;