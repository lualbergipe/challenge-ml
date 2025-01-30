const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/items');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/items', itemsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
