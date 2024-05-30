import React from 'react';
import { useUsersContext } from '../../../hooks/UserContext';
import { Link } from 'react-router-dom';
import BackButton from '../../../services/backButton/BackButton';

import './loginUser.css';

function LoginUser() {
  const { usersContext } = useUsersContext();

  return (
    <div className='login-token'>
      <BackButton />
      {
        usersContext.name == undefined ? (
          <h3 className='login fst-italic fw-light'><Link to={'/login'} className='login-link'>Loguéate</Link> para tener una mayor expriencia</h3>
        ) : (
          <h3 className='logged fst-italic fw-light'>{`Bienvenido, ${usersContext.name} ${usersContext.lastname}`}</h3>
        )
      }
      {/* {
        usersContext.token && (
          <small className='token'>{`Token: ${usersContext.token}`}</small>
        )
      } */}
    </div>
  );
};

export default LoginUser;