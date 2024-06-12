import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { countries } from '../../../services/countries';
import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import { useAppContext } from '../../../hooks/AppContext';

import Swal from 'sweetalert2';

export default function User({ user, edit, reviewList, token, handleNavigate }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user`;
  const { handleClose } = useAppContext();
  const [error, setError] = useState(false);

  const roles = [
    { id: 1, role: 'isStudent', description: 'Estudiante'},
    { id: 2, role: 'isTeacher', description: 'Profesor'},
    { id: 3, role: 'isAdmin', description: 'Administrador'}
  ];

  const statusUser = [
    { id: 2, description: 'Activo'},
    { id: 3, description: 'No Activo'}
  ];

  const initialForm = {
    id: user ? user.id : '',
    name: user ? user.name : '',
    lastname: user ? user.lastname : '',
    email: user ? user.email : '',
    password: user ? user.password : '',
    confirmPassword: '',
    address: user ? user.address : '',
    city: user ? user.city : '',
    phone: user ? user.phone : '',
    role: user ? user.role : '',
    status: user ? user.status : ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput
  } = useForm(initialForm, validationSchema);

  const { name, lastname, email, password, confirmPassword, address, city, phone, role, status } = formData;

  let {
    dataServer,
    createData,
    updateData
  } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      const numError = validateForm();
      if (!numError) {
        formData = {
          ...formData,
          token
        };
        let url = `${api}`;
        if (!edit) {
          await createData(url, formData);
        } else {
          await updateData(url, user.id, formData);
        };
      } else {
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: 'Debes corregir la información para poder registrarla',
          showConfirmButton: false,
          timer: 2000
        });
      }; 
    } else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Debe loguearse para utilizar esta función',
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/login'); 
    };
  };

  useEffect(() => {
    if (dataServer?.status == null) {
      return;
    };
    if (dataServer?.status !== 401) {
      if (dataServer?.status === 200 || dataServer?.status === 201) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: dataServer?.dataServerResult?.message,
          showConfirmButton: false,
          timer: 2000
        });
        handleClose();
        reviewList();
      };
      if (dataServer?.status === 400 || dataServer?.status === 404) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: dataServer?.dataServerResult.message,
          showConfirmButton: false,
          timer: 2000
        });
      };
    } else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      });
      handleClose();
      handleNavigate('/login');
    };
  }, [dataServer]);

  return (
    <>
    {
      error ? (
        errorMessage()
      ) : (
        <div className='p-5'>
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
            {!edit && (
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
            )}
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor='address'>Dirección</label>
                <input
                  type='text'
                  name='address'
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
              {
                edit ? (
                  <button onClick={handleSubmit} className='btn btn-primary w-100'>Actualizar</button>
                ) : (
                  <button onClick={handleSubmit} className='btn btn-primary w-100'>Agregar</button>
                )
              }
            </div>
          </form>
        </div>
      )
    }
    </>
  );
};