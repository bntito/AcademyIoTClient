import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

export default function PasswordChange() {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user/changepassword`;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { usersContext } = useUsersContext();

  // Estado inicial del formulario
  const initialForm = {
    email: '',
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: ''
  };

  // Hook de formulario personalizado
  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema);

  // Desestructuración de los valores del formulario
  let { email, oldPassword, newPassword, newConfirmPassword } = formData;

  // Hook de fetch personalizado
  let {
    dataServer,
    createData
  } = useFetch(null);

  // Manejo del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      formData = {
        ...formData,
        token: usersContext.token
      };
      let url = `${api}`;
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

  // Efecto que maneja la respuesta del servidor
  useEffect(() => {
    if (dataServer?.status == null) {
      return;
    }
    if (dataServer?.message || dataServer?.message != undefined) {
      Swal.fire(dataServer?.message);
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
      }
      if (dataServer?.status === 400) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: dataServer?.dataServerResult.message,
          showConfirmButton: false,
          timer: 2000
        });
        clearForm();
      }
    }
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
                  placeholder='Indique Correo Electrónico'
                  autoComplete='email'
                  value={email}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.email && (
                    <ValidateErrors
                      errors={errorsInput.email}
                    />
                  )
                }                
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Indique su Antigua Contraseña</label>
                <div className='div-flex'>
                  <input
                    type={visible ? 'text' : 'password'}
                    name='oldPassword'
                    placeholder='Indique su Antigua Contraseña'
                    autoComplete='on'
                    value={oldPassword}
                    onChange={onInputChange}
                    className='form-control'
                  />
                  <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    className='btn btn-outline-secondary btn-password'
                  >
                    {
                      visible ? (
                        <FaRegEyeSlash />
                      ) : (
                        <FaRegEye />
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
                    placeholder='Indique su Nueva Contraseña'
                    autoComplete='on'
                    value={newPassword}
                    onChange={onInputChange}
                    className='form-control'
                  />                 
                  <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    className='btn btn-outline-secondary btn-password'
                  >
                    {
                      visible ? (
                        <FaRegEyeSlash />
                      ) : (
                        <FaRegEye />
                      )
                    }
                  </button>
                </div>
                {
                  errorsInput.newPassword && (
                    <ValidateErrors
                      errors={errorsInput.newPassword}
                    />
                  )
                } 
              </div>
              <div className='mb-4'>
                <label htmlFor='email'>Confirmar Contraseña</label>
                <div className='div-flex'>
                  <input
                    type={visible ? 'text' : 'password'}
                    name='newConfirmPassword'
                    placeholder='Confirme su Nueva Contraseña'
                    autoComplete='on'
                    value={newConfirmPassword}
                    onChange={onInputChange}
                    className='form-control'
                  />            
                  <button
                    type='button'
                    onClick={() => setVisible(!visible)}
                    className='btn btn-outline-secondary btn-password'
                  >
                    {
                      visible ? (
                        <FaRegEyeSlash />
                      ) : (
                        <FaRegEye />
                      )
                    }
                  </button>
                </div>
                {
                  errorsInput.newConfirmPassword && (
                    <ValidateErrors
                      errors={errorsInput.newConfirmPassword}
                    />
                  )
                }      
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