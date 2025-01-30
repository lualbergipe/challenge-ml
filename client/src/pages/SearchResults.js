import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchItemsByQuery } from '../services/api';
import NoResults from '../components/NoResults/NoResults';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import ProductList from '../components/ProductList/ProductList';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const  SearchResults = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

   // Extraemos el  parametro "?search="
   const queryParams = new URLSearchParams(location.search);
   const search = queryParams.get('search') || '';

   useEffect(() => {
    // Declaramos una función asíncrona dentro del effect
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchItemsByQuery(search);
        console.log(data, 'la data a evaluar');
        
        setItems(data.items);
        setCategories(data.categories);
      } catch (err) {
        console.error(err);
        setError('Ocurrió un error al buscar los productos.');
      } finally {
        setLoading(false);
      }
    };
  
    // Sólo ejecutamos la función si hay un término de búsqueda
    if (search) {
      fetchData();
    }
  }, [search]);

  console.log(items);
  if (loading) {
    return <LoadingIndicator/>;
  }
  const handleItemClick = (id) => {
    navigate(`/items/${id}`);
  };
  return (
    <div>
      <Breadcrumb categories={categories} />
    {
        items.length === 0 ? (
            <NoResults searchTerm={search}/>
        ): (
            <ProductList items={items} onItemClick={handleItemClick} />
        )
    }
  </div>
  );
}

export default SearchResults;
