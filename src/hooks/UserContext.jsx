import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear el contexto de la aplicación
const UsersContext = createContext();

// Hook personalizado para acceder al contexto de la aplicación
export const useUsersContext = () => {
  return useContext(UsersContext);
};

// Proveedor de contexto de la aplicación
export const UsersProvider = ({ children }) => {
  const [usersContext, setUsersContext] = useState([]);
  const navigate = useNavigate();
  // Función para navegar dentro del contexto
  const navigateContext = async (rute) => {
    navigate(rute);
  };

  // Proporcionar el contexto y sus valores a los componentes secundarios
  return (
    <UsersContext.Provider
      value = {{
        usersContext,
        setUsersContext,
        navigateContext
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}