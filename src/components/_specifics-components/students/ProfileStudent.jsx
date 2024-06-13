import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import { countries } from '../../../services/countries';
import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';

export default function ProfileStudent() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/student`;
  const { usersContext } = useUsersContext();
  const token = usersContext.token;
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [student, setStudent] = useState({});
  const initialForm = {
    id: student && student.id ? student.id : '',
    dni: student && student.dni ? student.dni : '',
    name: student && student.name ? student.name : '',
    lastname: student && student.lastname ? student.lastname : '',
    email: student && student.email ? student.email : '',
    password: student && student.password ? student.password : '',
    confirmPassword: '',
    address: student && student.address ? student.address : '',
    birthday: student && student.birthday ? student.birthday : '',
    city: student && student.city ? student.city : '',
    phone: student && student.phone ? student.phone : '',
    condition: student && student.condition ? student.condition : ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    fillForm
  } = useForm(initialForm, validationSchema);

  const { dni, name, lastname, email, password, confirmPassword, address, birthday, city, phone, condition } = formData;

  let {
    dataServer,
    getData,
    updateData
  } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numError = validateForm();
    if (!numError) {
      formData = {
        ...formData,
        token
      };
      let url = `${api}`;
      await updateData(url, student.id, formData);
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

  const getStudent = async (event) => {
    let url = `${api}/dni/${event.target.value}`;
    const resp = await getData(url);
    if (async () => resp) {
      setStudent(resp?.dataServerResult?.dataApi);
    } else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: dataServer?.dataServerResult?.message,
        showCloseButton: false,
        timer: 2000
      });
    }
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
      }
    } else {
      setError(true);
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      });
    }
  }, [dataServer]);

  useEffect(() => {
    fillForm(student);
  }, [student]);

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
          <h3>Modificación de Estudiantes</h3>
          <form
            onSubmit={handleSubmit}
          >
            <div>
              <div className='div-70'>
                <label htmlFor='dni'>Número de Documento</label>
                <input 
                  type='text'
                  name='dni'
                  placeholder='Búsqueda por Documento'
                  value={dni}
                  onBlur={getStudent}
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
                        >
                          {country.pais}
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
              <button 
                onClick={handleSubmit}
                className='btn btn-primary w-100'>Actualizar</button>
            </div>
          </form>
        </div>
      )
    }
    </>
  );
};