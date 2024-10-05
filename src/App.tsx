import React from 'react';
import './scss/app.scss';
import { Header } from './components/Header';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { FullPizza } from './pages/FullPizza';
import MainLayout from './layout/MainLayout';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path="" element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
