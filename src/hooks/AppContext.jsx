import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const handleClose = async () => {
    const modal = document.getElementById('modal');
    modal.classList.add('fadeOut');
    modal.addEventListener('animationend', (e) => {
      const divRoot = document.getElementById('modal');
      divRoot.remove();
    });
  };

  return (
    <AppContext.Provider
      value={{ handleClose }}
    >
      {children}
    </AppContext.Provider>
  );
};