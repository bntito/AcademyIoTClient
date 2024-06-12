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

export default function Student() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/student`;
  const navigate = useNavigate();
  const { usersContext } = useUsersContext();
  const token = usersContext.token;
  const userId = usersContext.id;
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [student, setStudent] = useState({});
  const initialForm = {
    id: student && student.id ? student.id : '',
    dni: student && student.dni ? student.dni : '',
    name: student && student.name ? student.name : '',
    lastname: student && student.lastname ? student.lastname : '',
    email: student && student.email ? student.email : '',
    address: student && student.address ? student.address : '',
    birthday: student && student.birthday ? student.birthday : '',
    city: student && student.city ? student.city : '',
    phone: student && student.phone ? student.phone : '',
    condition: student && student.condition ? student.condition : '',
    password: ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema);

  const { id, dni, name, lastname, email, address, birthday, city, phone, condition, password } = formData;

  let {
    dataServer,
    isLoading = false,
    getData,
    createData,
    updateData
  } = useFetch(null);

  const confirmUserPassword = async (e) => {
    e.preventDefault();
    const url = `${hostServer}/api/users/${userId}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          name: name,
          lastname: lastname,
          password: password
        })
      });
      const result = await response.json();
      if (response.ok) {
        setConfirmPassword(true);
      } else {
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: result.message,
          showCloseButton: false,
          timer: 2000
        });
        setConfirmPassword(false);
      }
    } catch (error) {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: result,
        showCloseButton: false,
        timer: 2000
      });
      setConfirmPassword(false);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await confirmUserPassword(e);
    if (token) {
      const numError = validateForm();
      if (!numError) {
        let url = `${api}`;
        formData = {
          ...formData,
          token
        };
        if (!confirmPassword) {
          return;
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
    }
    if (dataServer?.status !== 401) {
      if (dataServer?.status === 200 || dataServer?.status === 201) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: dataServer?.dataServerResult?.message,
          showConfirmButton: false,
          timer: 2000
        });
        navigate('/studentsList');
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
            <h3>Adición de Estudiante</h3>
            <form
              onSubmit={handleSubmit}
            >
              <div>
                <div className='div-70'>
                  <label htmlFor='dni'>Número de Documento</label>
                  <input 
                    type='text'
                    name='dni'
                    placeholder='Indique Número de Documento'
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
                    placeholder='Indique Nombres'
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
                    placeholder='Indique Apellidos'
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
                    placeholder='Indique Correo Electrónico'
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
                    placeholder='Indique Número de Celular'
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
              <div className='div-70 mx-auto'>
                <div>
                  <label htmlFor=''>Dirección</label>
                  <input 
                    type='text'
                    name='address'
                    placeholder='Indique Dirección'
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
                        >
                          {country.pais}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='w-50 mx-auto mt-3'>
                <div>
                  <label htmlFor=''>Contraseña de Usuario</label>
                  <input 
                    type="password"
                    autoComplete='on'
                    name='password'
                    placeholder='Indique su contraseña'
                    value={password}
                    onChange={onInputChange}
                    onBlur={confirmUserPassword}
                    className='form-control'
                  />
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
              <div>
                <div className='div-30 mx-auto mt-3'>
                  <label htmlFor=''>Fecha de Nacimiento</label>
                  <input 
                    type='date'
                    name='birthday'
                    value={birthday}
                    onChange={onInputChange}
                    className='form-control'
                  />
                  {
                    errorsInput.birthday && (
                      <ValidateErrors
                        errors={errorsInput.birthday}
                      />
                    )
                  }
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
};