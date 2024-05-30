import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Swal from 'sweetalert2';
import { MdOutlinePublishedWithChanges } from "react-icons/md";

export default function PasswordChange() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user/changepassword`;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const { usersContext } = useUsersContext();

  const initialForm = {
    email: '',
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm);

  let { id, email, oldPassword, newPassword,
    newConfirmPassword } = formData;

  let {
    dataServer,
    isLoading = false,
    getData,
    createData,
    updateData
  } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      let url = `${api}`;
      formData = {
        ...formData,
        token: usersContext.token
      };
      await createData(url, formData);
    } else {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Debes corregir la información para cambiar la contraseña',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  useEffect(() => {
    if (dataServer?.status == null) {
      return;
    }
    if (dataServer?.status !== 200) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: dataServer?.dataServerResult?.message,
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      if (dataServer?.status === 200) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: dataServer?.dataServerResult.message,
          showConfirmButton: false,
          timer: 2000
        });
        console.log('Login Usuario:', dataServer.dataServerResult.dataApi);
        navigate('/usersList');
      };
      if (dataServer?.status === 400) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: dataServer?.dataServerResult.message,
          showConfirmButton: false,
          timer: 2000
        });
        clearForm();
      };
    };
  }, [dataServer]);

  return (
    <>
    <div className='login-user-container'>
      <LoginUser/>
    </div>
      <div className='form-container mx-auto user-container'>
        <h3>Cambiar Contraseña</h3>
          <div className='mx-auto'>
            <form 
              onSubmit={handleSubmit}
              className='mb-5 login-form'
            >
              <MdOutlinePublishedWithChanges
                className='user-icon'
              />
              <div className='mt-3 mb-4'>
                <label htmlFor='email'>Dirección de Correo Electrónico</label>
                <input
                  type='email'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={onInputChange}
                  className='form-control'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Indique su Antigua Contraseña</label>
                <div className='div-flex'>
                  <input
                    type={visible ? 'text' : 'password'}
                    name='oldPassword'
                    autoComplete='on'
                    value={oldPassword}
                    onChange={onInputChange}
                    className='form-control'
                  />
                  <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    className='btn btn-outline-secondary'
                  >
                    {
                      visible ? (
                        <span>Ocultar</span>
                      ) : (
                        <span>Ver</span>
                      )
                    }
                  </button>
                </div>
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Indique su Nueva Contraseña</label>
                <div className='div-flex'>
                  <input
                    type={visible ? 'text' : 'password'}
                    name='newPassword'
                    autoComplete='on'
                    value={newPassword}
                    onChange={onInputChange}
                    className='form-control'
                  />
                  <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    className='btn btn-outline-secondary'
                  >
                    {
                      visible ? (
                        <span>Ocultar</span>
                      ) : (
                        <span>Ver</span>
                      )
                    }
                  </button>
                </div>
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Confirmar Contraseña</label>
                <div className='div-flex'>
                  <input
                    type={visible ? 'text' : 'password'}
                    name='newConfirmPassword'
                    autoComplete='on'
                    value={newConfirmPassword}
                    onChange={onInputChange}
                    className='form-control'
                  />
                  <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    className='btn btn-outline-secondary'
                  >
                    {
                      visible ? (
                        <span>Ocultar</span>
                      ) : (
                        <span>Ver</span>
                      )
                    }
                  </button>
                </div>
              </div>                  
              <div className='m-auto div-70 mt-5 mb-5'>
                <button
                  type='submit'
                  className='btn btn-primary w-100'
                >
                  Enviar
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
}