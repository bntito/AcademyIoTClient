import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase/config';

import BackButton from '../../../services/backButton/BackButton';
import { useUsersContext } from '../../../hooks/UserContext';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';
import { CiUser } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user/login`;
  const navigate = useNavigate();
  const { setUsersContext } = useUsersContext();
  const [visible, setVisible] = useState(false);

  // Estado inicial del formulario
  const initialForm = {
    email: '',
    password: ''
  };

  // Campos a omitir en la validación
  const fieldsToSkipValidation = ['password'];

  // Hook de formulario personalizado
  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema, fieldsToSkipValidation);

  // Desestructuración de los valores del formulario
  const { email, password } = formData;

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
        title: 'Debes corregir la información para Loguerte',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  // Manejar inicio de sesión con Google
  const handleLoginGoogle = async () => {
    const url = `${hostServer}/api/user/logingoogle`;
    let result;
    try {
      const resultFirebase = await signInWithPopup(auth, googleProvider);
      const user = resultFirebase.user;
      const userEmail = user.email;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginGoogleEmail: userEmail })
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message) || 'Error en el Login con Google';
      }
      result = await response.json();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 2000
      })
      setUsersContext(result.dataApi);
      navigate('/');
    } catch (error) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: error.message || 'Error al iniciar sesión con Google',
        showConfirmButton: false,
        timer: 2000
      });
      console.error('Error al iniciar sesión con Google', error);
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
        title: dataServer?.dataServerResult.message,
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
        })
        setUsersContext(dataServer?.dataServerResult.dataApi);
        navigate('/');
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
      <BackButton />
      <div className='form-container mx-auto user-container'>
        <h3>Iniciar Sesión</h3>
        <form 
          onSubmit={handleSubmit}
          className='mb-2 login-form'
        >
          <CiUser
            className='user-icon'
          />
          <div className='mt-2 mb-3'>
            <label htmlFor='email'>Dirección de Correo Electrónico</label>
            <input
              type='email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={onInputChange}
              placeholder='Indique Correo Electrónico'
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
          <div className='mb-3'>
            <label htmlFor='email'>Indique su Contraseña</label>
            <div className='div-flex'>
              <input
                type={visible ? 'text' : 'password'}
                name='password'
                autoComplete='on'
                value={password}
                onChange={onInputChange}
                placeholder='Indique su Contraseña'
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
          <div className='mb-3 methods-log'>
            <label htmlFor=''>Iniciar Sesión con</label>
          </div>
            <div className='div-method-icon'>
              <FcGoogle 
                onClick={handleLoginGoogle}
                className='method-icon'
              />
            </div>
          <div className='m-auto div-70 mt-5 mb-5'>
            <button
              type='submit'
              className='btn btn-primary w-100'
            >
              Iniciar Sesión
            </button>
          </div>
        </form> 
      </div>
    </>
  );
}

export default Login;