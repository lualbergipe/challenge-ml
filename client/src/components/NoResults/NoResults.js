import React from 'react';
import search from "../../assets/images/ic_Search@2x.png";
import { useNavigate, Link } from 'react-router-dom';

function NoResults() {
    const navigate = useNavigate();

  return (
    <div className="no__results_container">
        <img src={search} className="header__logo" alt="MercadoLibre" />
      <div className='message__not'>
      <h2>No hay publicaciones que coincidan con tu búsqueda.</h2>
      <ul className='list__message'>
        <li>Revisa la ortografía de la palabra</li>
        <li>Utiliza palabras más genéricas o menos palabras.</li>
      </ul>
      <Link to="/" className="return">
            Voler
          </Link>
      </div>
    </div>
  );
}

export default NoResults;
