import React from 'react';
import propTypes from 'prop-types';
// import { ProductsCardS } from './Style';
import formatCurrency from '../FormatCurrency';

function ProductsCard({ product }) {
  return (
    <tr key={product.code}>
      <td id="tableElCode">{product.code}</td>
      <td id="tableElName">{product.name}</td>
      <td id="tableElCurPrice">{formatCurrency(product.currentPrice).replace('.', ',')}</td>
      <td id="tableElNewPrice">{formatCurrency(product.newPrice).replace('.', ',')}</td>
      <td id="tableElStatus">
        {product.status.map((status) => (
          <span key={product.code}>
            {status}
          </span>
        ))}
      </td>
    </tr>
  );
}

ProductsCard.propTypes = {
  product: propTypes.shape({
    code: propTypes.string,
    name: propTypes.string,
    currentPrice: propTypes.number,
    newPrice: propTypes.number || propTypes.string,
    status: propTypes.arrayOf(propTypes.string),
  }).isRequired,
};

export default ProductsCard;
