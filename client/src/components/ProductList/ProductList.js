import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

function ProductList({ items, onItemClick }) {
  return (
    <div className="product__list">
      {items.map(item => (
        <ProductItem 
          key={item.id} 
          item={item} 
          onClick={() => onItemClick(item.id)} 
        />
      ))}
    </div>
  );
}

export default ProductList;
