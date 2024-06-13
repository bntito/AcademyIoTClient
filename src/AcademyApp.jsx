import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UsersProvider } from './hooks/UserContext';

import routes from './routes/Index';

import Header from './components/_commons-components/header/Header';
import Menu from './components/_commons-components/menu/Menu';
import Footer from './components/_commons-components/footer/Footer';

import './App.css';

const AcademyApp = () => {
  const [viewMenu, setViewMenu] = useState(true);

  const menuview = () => {
    setViewMenu(!viewMenu)
  };

  return (
    <Router>
      <UsersProvider>
        <Header 
          menuview={menuview}
        />
        <main>
          <div className={`menu-container ${viewMenu ? 'menu-close' : 'menu-open'}`}>
            <div className='menu-item-route'>
              <Menu
                closeMenu={menuview}
              />
            </div>
          </div>
          <div className='menu-item-route'>
            <Routes>
              {
                routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))
              }
            </Routes>
          </div>
        </main>
        <Footer />
      </UsersProvider>
    </Router>
  );
}

export default AcademyApp;