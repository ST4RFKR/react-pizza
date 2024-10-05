import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';

const MainLayout = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
