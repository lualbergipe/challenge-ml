import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/app.scss';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    
    
    <Router>
    <Header/>
    <section className="meli-centered">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<SearchResults />} />
        <Route path="/items/:id" element={<ProductDetailPage />} />
      </Routes>
      </section>
      <ToastContainer />
    </Router>
    </>
  );
}

export default App;
