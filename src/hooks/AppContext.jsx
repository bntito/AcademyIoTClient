import React, { createContext, useContext } from 'react';

// Crear el contexto de la aplicación
const AppContext = createContext();

// Hook personalizado para acceder al contexto de la aplicación
export const useAppContext = () => {
  return useContext(AppContext);
};

// Proveedor de contexto de la aplicación
export const AppContextProvider = ({ children }) => {
  // Función para cerrar el modal
  const handleClose = async () => {
    const modal = document.getElementById('modal');
    modal.classList.add('fadeOut');
    modal.addEventListener('animationend', (e) => {
      const divRoot = document.getElementById('modal');
      divRoot.remove();
    });
  };

  // Proporcionar el contexto y sus valores a los componentes secundarios
  return (
    <AppContext.Provider
      value={{ handleClose }}
    >
      {children}
    </AppContext.Provider>
  );
}