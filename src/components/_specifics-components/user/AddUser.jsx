import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import { countries } from '../../../services/countries';
import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';

export default function User() {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user`;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { usersContext } = useUsersContext();

  // Definición de roles y estado de usuarios
  const roles = [
    { id: 1, role: 'isStudent', description: 'Estudiante'},
    { id: 2, role: 'isTeacher', description: 'Profesor'},
    { id: 3, role: 'isAdmin', description: 'Administrador'}
  ];

  const statusUser = [
    { id: 2, description: 'Activo'},
    { id: 3, description: 'No Activo'}
  ];

  // Estado inicial del formulario
  const initialForm = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    phone: '',
    role: '',
    status: '',
    token: usersContext.token
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
  const { name, lastname, email, password, confirmPassword, address, city, phone, role, status } = formData;

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
      let url = `${api}`;
      await createData(url, formData);
    } else {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Debes corregir la información para poder registrarla',
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
    if (dataServer?.status == 200 || dataServer?.status == 201) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: dataServer?.dataServerResult?.message,
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/login');
    }
    if (dataServer?.status === 400 || dataServer?.status === 404) {
      setError(true);
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      });
      clearForm();
    }
  }, [dataServer]);

  // Mensaje de error en caso de fallo
  const errorMessage = () => {
    return (
      <div className='error-message'>
        <h3>Error</h3>
        <p>Ocurrió un error al procesar su solicitud. Por favor, inténtelo de nuevo.</p>
      </div>
    );
  };

  return (
    <>
    <div className='login-user-container'>
      <LoginUser/>
    </div>
    {
      error ? (
        errorMessage()
      ) : (
        <div className='form-container'>
          <h3>Adición de Usuarios</h3>
          <form>
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor='name'>Nombre</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Ingrese Nombres'
                  value={name}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.name && (
                    <ValidateErrors
                      errors={errorsInput.name}
                    />
                  )
                }
              </div>
              <div className='w-100'>
                <label htmlFor='lastname'>Apellidos</label>
                <input
                  type='text'
                  name='lastname'
                  placeholder='Ingrese Apellidos'
                  value={lastname}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.lastname && (
                    <ValidateErrors
                      errors={errorsInput.lastname}
                    />
                  )
                }
              </div>
            </div>
            <div>
              <label htmlFor='email'>Correo Electrónico</label>
              <input
                type='email'
                name='email'
                placeholder='Ingrese el Correo Electrónico'
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
            <div className='w-50 mx-auto'>
              <label htmlFor='roles'>Roles</label>
              <select 
                name='role'
                value={role}
                onChange={onInputChange}
                className='form-control'
              >
                <option>Seleccione el Rol</option>
                {
                  roles.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.role}
                      >
                        {item.description}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <div className='gap-2 m-auto'>
              <div className='div-70 mx-auto'>
                <label htmlFor='password'>Contraseña</label>
                <input
                  type='password'
                  autoComplete='on'
                  name='password'
                  placeholder='Indique su contraseña'
                  value={password}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.password && (
                    <ValidateErrors
                      errors={errorsInput.password}
                    />
                  )
                }
              </div>
              <div className='div-70 mx-auto'>
                <label htmlFor='confirmPassword'>Confirmación de Contraseña</label>
                <input
                  type='password'
                  autoComplete='on'
                  name='confirmPassword'
                  placeholder='Indique su contraseña'
                  value={confirmPassword}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.confirmPassword && (
                    <ValidateErrors
                      errors={errorsInput.confirmPassword}
                    />
                  )
                }
              </div>
            </div>
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor='address'>Dirección</label>
                <input
                  type='text'
                  name='address'
                  placeholder='Ingrese Dirección'
                  value={address}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.address && (
                    <ValidateErrors
                      errors={errorsInput.address}
                    />
                  )
                }                
              </div>
              <div className='w-100'>
                <label htmlFor=''>Ciudad</label>
                <select
                  name='city'
                  value={city}
                  onChange={onInputChange}
                  className='form-control'
                >
                  <option>Selecione ciudad</option>
                  {
                    countries.map((country) => (
                      <option 
                        key={country.id}
                        value={country.pais}
                      >
                        {country.pais}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className='div-flex gap-2'>
              <div className='div-70'>
                <label htmlFor='phone'>Número de Celular</label>
                <input 
                  type='text'
                  name='phone'
                  placeholder='Ingrese Número de Celular'
                  value={phone}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.phone && (
                    <ValidateErrors
                      errors={errorsInput.phone}
                    />
                  )
                }                  
              </div>
            </div>
            <div className='div-30 mx-auto'>
              <label htmlFor='status'>Condición de Usuario</label>
              <select 
                name='status'
                value={status}
                onChange={onInputChange}
                className='form-control'
              >
                <option>Selecione opción</option>
                {
                  statusUser.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.description}
                      >
                        {item.description}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <div className='w-300px mt-5'>
              <button onClick={handleSubmit} className='btn btn-primary w-100'>Agregar</button>
            </div>
          </form>
        </div>
      )
    }
    </>
  );
}