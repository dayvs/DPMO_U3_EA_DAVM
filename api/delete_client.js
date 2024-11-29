const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

router.delete('/delete_client', async (req, res) => {
    const { id_cliente } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: 'sql106.infinityfree.com',
            user: 'if0_37779872',
            password: 'IoyZ6Zv32S5bW9',
            database: 'if0_37779872_db_formula1',
        });

        const [result] = await connection.execute(
            'DELETE FROM tbl_clientes WHERE id_cliente = ?',
            [id_cliente]
        );

        await connection.end();
        res.status(200).json({ message: 'El cliente fue eliminado con éxito', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
});

module.exports = router;