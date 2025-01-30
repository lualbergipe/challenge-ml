// server/services/itemsService.js
const axios = require('axios');

const ML_API_BASE_URL = process.env.API_BASE_URL || 'https://api.mercadolibre.com';
// Helpers para parsear la información de la API de ML
function parseItemData(apiItem) {
  
  return {
    id: apiItem.id,
    title: apiItem.title,
    price: {
      currency: apiItem.currency_id,
      amount: Math.floor(apiItem.price),
      decimals: Number((apiItem.price % 1).toFixed(2)) * 100 // aproximación a decimales
    },
    picture: apiItem.thumbnail,
    condition: apiItem.condition,
    free_shipping: apiItem.shipping && apiItem.shipping.free_shipping,
    category_id: apiItem.category_id,
  };
}

async function fetchItemsByQuery(query) {
  const url = `${ML_API_BASE_URL}/sites/MLA/search?q=${query}`;
  const { data } = await axios.get(url);

  let categories = [];
  if (data.filters && data.filters.length > 0) {
    const categoryFilter = data.filters.find(f => f.id === 'category');
    if (categoryFilter && categoryFilter.values && categoryFilter.values.length > 0) {
      categories = categoryFilter.values[0].path_from_root.map(cat => cat.name);
    }
  } else {
    // Si "filters" está vacío, se puede chequear "available_filters"
    // y buscar la que tenga la mayor cantidad de resultados
    const categoryFilter = data.available_filters.find(f => f.id === 'category');
    if (categoryFilter && categoryFilter.values) {
      // Ordenar para encontrar la categoría con más resultados
      const topCategory = categoryFilter.values.reduce((prev, current) => {
        return (prev.results > current.results) ? prev : current;
      });
      categories = [topCategory.name];
    }
  }

  // Tomar sólo los 4 primeros resultados
  const items = data.results.slice(0, 4).map((result) => parseItemData(result));

  return {
    categories,
    items
  };
}

async function fetchItemById(id) {
  // 1) Traemos la información general del item
  const itemUrl = `${ML_API_BASE_URL}/items/${id}`;
  // 2) traemos la Descripción
  const descUrl = `${ML_API_BASE_URL}/items/${id}/description`;

  const [itemRes, descRes] = await Promise.all([
    axios.get(itemUrl),
    axios.get(descUrl)
  ]);

  const itemData = itemRes.data;
  const descriptionData = descRes.data;

  //Aca consultamos el nombre de la categoría del prodcuto actual
  const categoryRes = await axios.get(`${ML_API_BASE_URL}/categories/${itemData.category_id}`);
 
  // Parsear data
  const item = {
    id: itemData.id,
    title: itemData.title,
    price: {
      currency: itemData.currency_id,
      amount: Math.floor(itemData.price),
      decimals: Number((itemData.price % 1).toFixed(2)) * 100
    },
    picture: itemData.thumbnail,
    condition: itemData.condition,
    free_shipping: itemData.shipping && itemData.shipping.free_shipping,
    sold_quantity: itemData.sold_quantity,
    description: descriptionData.plain_text,
    category: categoryRes.data && categoryRes.data.name ? categoryRes.data.name : "" ,
  };

  return { item };
}
async function fetchCategoryById(id) {

}
module.exports = {
  fetchItemsByQuery,
  fetchItemById
};
