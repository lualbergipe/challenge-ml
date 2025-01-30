import React from 'react';

function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <div className="loading-indicator__spinner" />
      <p>Cargando...</p>
    </div>
  );
}

export default LoadingIndicator;
