const express = require('express');
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Rutas de la API
const insertClient = require('./api/insert_client');
const getClients = require('./api/get_clients');
const updateClient = require('./api/update_client');
const deleteClient = require('./api/delete_client');

app.use('/api', insertClient);
app.use('/api', getClients);
app.use('/api', updateClient);
app.use('/api', deleteClient);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});