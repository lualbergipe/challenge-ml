// src/pages/Home.jsx
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const  Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/items?search=${searchTerm}`);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Nunca dejes de buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Home;
