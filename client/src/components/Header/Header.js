import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import logo from "../../assets/images/Logo_ML.png";
import searchIcon from '../../assets/images/ic_Search.png';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/items?search=${searchTerm}`);
    }
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className='header'>
      <nav className="header__container">
        <Link to="/" className="logo-link-container">
            <img src={logo} className="header__logo" alt="MercadoLibre" />
        </Link>
        <form className="search" onSubmit={handleSubmit} role="search">
            <input
            type="text"
            id="search-field"
            placeholder="Nunca dejes de buscar"
            className="search__input"
            value={searchTerm}
            onChange={handleChange}
            aria-label="Buscar productos"
          />
          <button type="submit" className="search__button">
              <img src={searchIcon} alt="Boton buscar" />
          </button>
        </form>
      </nav>
    </header>
  )
}

export default Header
