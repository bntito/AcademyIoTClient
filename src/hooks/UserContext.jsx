import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersContext = createContext();

export const useUsersContext = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [usersContext, setUsersContext] = useState([]);
  const navigate = useNavigate();

  const navigateContext = async (rute) => {
    navigate(rute);
  };

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
};