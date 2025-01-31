import React from 'react';

function Breadcrumb({ categories = [] }) {
  return (
    <nav className="breadcrumb">
      {categories.map((cat, idx) => (
        <span key={idx} className="breadcrumb__item">
          {cat}
          {idx < categories.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
