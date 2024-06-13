import React from 'react';
import { useUsersContext } from '../../../hooks/UserContext';
import { Link } from 'react-router-dom';

import BackButton from '../../../services/backButton/BackButton';
import Avatar from '../../../services/avatar/Avatar';

import './loginUser.css';

function LoginUser() {
  const { usersContext } = useUsersContext();

  return (
    <div className='login-token'>
      <BackButton />
      {
        usersContext.name == undefined ? (
          <h3 
            className='login fst-italic fw-light'><Link to={'/login'} className='login-link'
          >Loguéate</Link> para tener una mayor expriencia o <Link to={'/signup'} className='register-link'>Regístrate</Link>
          </h3>

        ) : (
          <>
            <div className='div-login-user'>
              <Avatar />
              <h3 className='mx-3 logged fst-italic fw-light'>{`Bienvenido, ${usersContext.name} ${usersContext.lastname}`}</h3>
            </div>
          </>
        )
      }
      {/* {
        usersContext.token && (
          <small className='token'>{`Token: ${usersContext.token}`}</small>
        )
      } */}
    </div>
  );
}

export default LoginUser;