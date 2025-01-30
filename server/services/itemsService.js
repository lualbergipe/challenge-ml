// server/services/itemsService.js
const axios = require('axios');

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
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
  const { data } = await axios.get(url);

  let categories = [];
  if (data.filters && data.filters.length > 0) {
    const categoryFilter = data.filters.find(f => f.id === 'category');
    if (categoryFilter && categoryFilter.values && categoryFilter.values.length > 0) {
      // categoryFilter.values[0].path_from_root -> array de categorías
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
  // 1) Información general del item
  const itemUrl = `https://api.mercadolibre.com/items/${id}`;
  // 2) Descripción
  const descUrl = `https://api.mercadolibre.com/items/${id}/description`;

  const [itemRes, descRes] = await Promise.all([
    axios.get(itemUrl),
    axios.get(descUrl)
  ]);

  const itemData = itemRes.data;
  const descriptionData = descRes.data;

  // Obtener la categoría del item
  // Podrías hacer otra request a la categoría si quieres un breadcrumb completo, 
  // pero con la respuesta del item tienes un "category_id" que luego 
  // se podría usar para obtener más info si hicieras un get a /categories/:id.

  const categoryRes = await axios.get(`https://api.mercadolibre.com/categories/${itemData.category_id}`);
 
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
