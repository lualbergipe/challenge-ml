import React from 'react';
import { formatPrice } from '../../utils/priceFormatter';
import free from '../../assets/images/ic_shipping.png'
function ProductItem({ item, onClick }) {
  const { picture, title, price, free_shipping, condition } = item;
  const formattedPrice = formatPrice(price);

  return (
    <div className="product__item" onClick={onClick}>
      <img className="product__img" src={picture} alt={title} />
      <div className="product__detail">
        <h2>{formattedPrice} {free_shipping && <img src={free} className="free_shipping" alt="envío gratis" />}</h2>
        <p>{title}</p>
      </div>
      <span className='product__condition'>{condition}</span>
    </div>
  );
}

export default ProductItem;
