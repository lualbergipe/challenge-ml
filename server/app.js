// server/app.js
const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/items', itemsRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
