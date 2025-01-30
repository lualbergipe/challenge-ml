
export async function fetchItemsByQuery(search) {
    try {
      const response = await fetch(`http://localhost:3001/api/items?q=${search}`);      
      if (!response.ok) {
        throw new Error(`Error fetching items for query "${search}" - ${response.status}: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`[fetchItemsByQuery] ${error.message}`);

      throw error;
    }
  }
  
  export async function fetchItemById(id) {
    try {
      const response = await fetch(`http://localhost:3001/api/items/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching item with ID "${id}" - ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`[fetchItemById] ${error.message}`);
      throw error;
    }
  }
  