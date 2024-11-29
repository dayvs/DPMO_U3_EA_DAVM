const express = require('express');
const cors = require('cors');

const insertClient = require('./api/insert_client');
const getClients = require('./api/get_clients');
const updateClient = require('./api/update_client');
const deleteClient = require('./api/delete_client');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', insertClient);
app.use('/api', getClients);
app.use('/api', updateClient);
app.use('/api', deleteClient);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});