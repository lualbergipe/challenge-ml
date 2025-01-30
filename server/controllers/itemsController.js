// server/controllers/itemsController.js
const itemsService = require('../services/itemsService');

// Formato del autor (puede ser tu nombre y apellido)
const AUTHOR = { name: 'Luis', lastname: 'Giraldo' };

const getItemsByQuery = async (req, res) => {
  const query = req.query.q || '';
  try {
    const data = await itemsService.fetchItemsByQuery(query);

    // En data deberías tener un objeto con { categories, items } 
    // según la transformación que hagas en el servicio.
    const response = {
      author: AUTHOR,
      categories: data.categories, 
      items: data.items
    };
    return res.status(200).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error obteniendo ítems' });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await itemsService.fetchItemById(id);
    // data: { item: { ... }, categories: [ ... ] }
    const response = {
      author: AUTHOR,
      item: data.item,
    };
    return res.status(200).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error obteniendo ítem' });
  }
};

module.exports = {
  getItemsByQuery,
  getItemById
};
