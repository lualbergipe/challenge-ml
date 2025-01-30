// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { fetchItemById } from '../services/api';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

function ProductDetailPage() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchItemById(id);
        console.log(data, 'la data a evaluar');

        setCategories(data.categories);
        setItem(data.item);
      } catch (err) {
        console.error(err);
        setError('Ocurrió un error al buscar el producto.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Render condicional
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return null;
  }
console.log(item, 'el item');

  return (
   <>
    <Breadcrumb categories={[item.category]} />
    <ProductDetail item={item}/>
   </>
  );
}

export default ProductDetailPage;
