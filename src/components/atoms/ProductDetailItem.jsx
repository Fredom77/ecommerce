import React from 'react';
import PropTypes from 'prop-types';

const ProductDetailItem = ({ type, value }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold">{type}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

ProductDetailItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

export default ProductDetailItem;
