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
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user/login`;
  const navigate = useNavigate();
  const { setUsersContext } = useUsersContext();
  const [visible, setVisible] = useState(false);

  const initialForm = {
    email: '',
    password: ''
  };

  const fieldsToSkipValidation = ['password'];

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema, fieldsToSkipValidation);

  const { id, email, password } = formData;

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

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userEmail = user.email;
      console.log(user)
    } catch (error) {
      alert('Error al iniciar sesión con Google')
    }
  }

  useEffect(() => {
    if (dataServer?.status == null) {
      return;
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