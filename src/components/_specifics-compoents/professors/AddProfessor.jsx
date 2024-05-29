import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import { countries } from '../../../services/countries';
import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';

export default function Professor() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/professor`;
  const navigate = useNavigate();
  const { usersContext } = useUsersContext();
  const token = usersContext.token;
  const [error, setError] = useState(false);
  const [professor, setProfessor] = useState({});
  const initialForm = {
    id: professor && professor.id ? professor.id : '',
    dni: professor && professor.dni ? professor.dni : '',
    name: professor && professor.name ? professor.name : '',
    lastname: professor && professor.code ? professor.lastname : '',
    email: professor && professor.email ? professor.email : '',
    phone: professor && professor.phone ? professor.phone : '',
    password: professor && professor.password ? professor.password : '',
    confirmPassword: '',
    address: professor && professor.address ? professor.address : '',
    city: professor ? professor.city : '',
    condition: professor && professor.condition ? professor.condition : ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema);

  const { id, dni, name, lastname, email, password, confirmPassword, address, city, phone, condition } = formData;

  let {
    dataServer,
    isLoading = false,
    getData,
    createData,
    updateData
  } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      const numError = validateForm();
      if (!numError) {
        let url = `${api}`;
        formData = {
          ...formData,
          token
        };
        await createData(url, formData);
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
        navigate('/professorsList');
      };
      if (dataServer?.status === 400 || dataServer?.status === 404) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: dataServer?.dataServerResult.message,
          showConfirmButton: false,
          timer: 2000
        });
        clearForm();
      };
    } else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/login');
    };
  }, [dataServer]);

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
          <h3>Adición de Profesores</h3>
          <form
            onSubmit={handleSubmit}
          >
            <div>
              <div className='div-70'>
                <label htmlFor='dni'>Número de Documento</label>
                <input 
                  type='text'
                  name='dni'
                  value={dni}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.dni && (
                    <ValidateErrors
                      errors={errorsInput.dni}
                    />
                  )
                }
              </div>
            </div>
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor=''>Nombres</label>
                <input 
                  type='text'
                  name='name'
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
                <label htmlFor=''>Apellidos</label>
                <input 
                  type='text'
                  name='lastname'
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
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor=''>Correo electrónico</label>
                <input 
                  type='email'
                  name='email'
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
              <div className='w-100'>
                <label htmlFor=''>Número de Celular</label>
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
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor=''>Contraseña</label>
                <input 
                  type='password'
                  name='password'
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
              <div className='w-100'>
                <label htmlFor=''>Confirmación de Contraseña</label>
                <input 
                  type='text'
                  name='confirmPassword'
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
            <div className='div-70 mx-auto'>
              <div>
                <label htmlFor=''>Dirección</label>
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
              <div>
                <label htmlFor=''>Residencia</label>
                <select
                  name='city'
                  value={city}
                  onChange={onInputChange}
                  className='form-control'
                >
                  <option>Selecione residencia</option>
                  {
                    countries.map((country) => (
                      <option 
                        key={country.id}
                        value={country.pais}
                      >{country.pais}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className='div-flex div-center mt-3'>
              <div>
                <label htmlFor=''>Estatus</label>
                <select
                  name='condition'
                  value={condition}
                  onChange={onInputChange}
                  className='form-control'
                >
                  <option>Selecione opción</option>
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>              
            </div>
            <div className='m-auto div-70 mt-5'>
              <button type='submit' className='btn btn-primary w-100'>Agregar</button>
            </div>
          </form>
        </div>
      )
    }
    </>
  );
}