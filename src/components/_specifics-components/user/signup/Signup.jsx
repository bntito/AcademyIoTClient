import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../../hooks/useFetch';
import { useForm } from '../../../../hooks/useForm';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../../firebase/config';

import BackButton from '../../../../services/backButton/BackButton';
import { useUsersContext } from '../../../../hooks/UserContext';

import ValidateErrors from '../../../../services/validations/ValidateErrors';
import validationSchema from '../../../../services/validations/validationSchema';

import Swal from 'sweetalert2';
import { RiUserAddLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/user/signupemail`;
  const navigate = useNavigate();
  const { setUsersContext } = useUsersContext();
  const [visible, setVisible] = useState(false);

  const initialForm = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema);

  const { email, password, confirmPassword } = formData;

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

  const handleSignupGoogle = async () => {
    const url = `${hostServer}/api/user/signupgoogle`;
    let result;
    try {
      const resultFirebase = await signInWithPopup(auth, googleProvider);
      const user = resultFirebase.user;
      const userEmail = user.email;
      const userName = user.displayName;
      const userPhoto = user.photoURL;

      const [firstName, ...lastNameArray] = userName.split(' ');
      const userFirstName = firstName;
      const userLastName = lastNameArray.join(' ');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emailGoogle: userEmail,
          nameGoogle: userFirstName,
          lastnameGoogle: userLastName, 
          photoGoogle: userPhoto
        })
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message) || 'Error en el registro con Google';
      }
      result = await response.json();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 2000
      });
      setUsersContext({
        userEmail,
        userName,
        userPhoto
      });
      navigate('/completefromgoogle');
    } catch (error) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: error.message || 'Error al iniciar sesión con Google',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  useEffect(() => {
    if (dataServer?.status == null) {
      return;
    }
    if (dataServer?.status === 200 || dataServer?.status === 201) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      })
      setUsersContext(dataServer?.dataServerResult.dataApi);
      navigate('/completefromemail');
    } else {
      if (dataServer?.status !== 200) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: dataServer?.dataServerResult.message,
          showConfirmButton: false,
          timer: 2000
        });
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
      };
    };
  }, [dataServer]);

  return (
    <>
      <BackButton />
      <div className='form-container mx-auto user-container'>
        <h3>Registrarse</h3>
        <form 
          onSubmit={handleSubmit}
          className='mb-2 login-form'
        >
          <RiUserAddLine
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
            <label htmlFor='email'>Crear Contraseña</label>
            <div className='div-flex'>
              <input
                type={visible ? 'text' : 'password'}
                name='password'
                autoComplete='on'
                value={password}
                onChange={onInputChange}
                placeholder='Indique Contraseña'
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
              errorsInput.password && (
                <ValidateErrors
                  errors={errorsInput.password}
                />
              )
            }
          </div>
          <div className='mb-3'>
            <label htmlFor='email'>Confirmar Contraseña</label>
            <div className='div-flex'>
              <input
                type={visible ? 'text' : 'password'}
                name='confirmPassword'
                autoComplete='on'
                value={confirmPassword}
                onChange={onInputChange}
                placeholder='Confirme Contraseña'
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
              errorsInput.confirmPassword && (
                <ValidateErrors
                  errors={errorsInput.confirmPassword}
                />
              )
            }
          </div>
          <div className='mb-3 methods-log'>
            <label htmlFor=''>Registrarme con</label>
          </div>
            <div className='div-method-icon'>
              <FcGoogle 
                onClick={handleSignupGoogle}
                className='method-icon'
              />
            </div>
          <div className='m-auto div-70 mt-5 mb-5'>
            <button
              type='submit'
              className='btn btn-primary w-100'
            >
              Registrarse
            </button>
          </div>
        </form> 
      </div>
    </>
  );
}

export default Signup