import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/app.scss';
import Header from './components/Header/Header';

function App() {
  return (
    <>
    
    <section className="meli-centered">
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
    </section>
    </>
  );
}

export default App;
