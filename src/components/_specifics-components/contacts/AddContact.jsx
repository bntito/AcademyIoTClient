import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import BackButton from '../../../services/backButton/BackButton';

import { countries } from '../../../services/countries';
import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';

export default function Contact() {
  // Host del servidor desde las variables de entorno
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/contact`;
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  // Estados locales
  const [courses, setCourses] = useState([]);
  const [contact, setContact] = useState({});

  // Estado inicial del formulario
  const initialForm = {
    id: contact && contact.id ? contact.id : '',
    name: contact && contact.name ? contact.name : '',
    email: contact && contact.email ? contact.email : '',
    phone: contact && contact.phone ? contact.phone : '',
    city: contact && contact.city ? contact.city : '',
    course: contact && contact.course ? contact.course : '',
    message: contact && contact.message ? contact.message : ''
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
  const { name, email, phone, city, course, message } = formData;

  // Hook de fetch personalizado
  let {
    dataServer,
    createData,
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

  // Función para obtener los cursos
  const getCourses = async () => {
    let url = `${hostServer}/api/courses`;
    let response = await fetch(url);
    let respCourses = await response.json();
    if (respCourses) {
      if (async () => await respCourses.dataApi) {
        setCourses(respCourses.dataApi);
      }
    }
  };

  // Efecto que maneja la respuesta del servidor
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
        navigate('/contactList');
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
    } else {
      setError(true);
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/contactList');
    }
  }, [dataServer]);

  // Efecto para obtener los cursos al montar el componente
  useEffect(() => {
    getCourses();
  }, []);

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
    <BackButton />
    {
      error ? (
        errorMessage()
      ) : (
        <div className='form-container'>
          <h3>Adición de Contacto</h3>
          <form
            onSubmit={handleSubmit}
          >
            <div className='div-flex gap-2 media-column'>
              <div className='w-100'>
                <label htmlFor='name'>Nombre Completo</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Ingrese nombres'
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
                <label htmlFor='email'>Correo Electrónico</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Ingrese el correo electrónico'
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
            </div>
            <div>
              <div className='div-70'>
                <label htmlFor='phone'>Número de celular</label>
                <input
                  type='text'
                  name='phone'
                  placeholder='Ingrese número telefónico'
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
              <div className='div-70'>
                <label htmlFor=''>Ciudad</label>
                <select
                  name='city'
                  value={city}
                  onChange={onInputChange}
                  className='form-control'
                >
                  <option>Selecione Ciudad</option>
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
            <div>
              <div className='w-50'>
                <label htmlFor='course'>Nuestros Cursos Disponibles</label>
                <select
                  name='course'
                  value={course}
                  onChange={onInputChange}
                  className='form-control'
                >
                  <option>Seleccione un Curso</option>
                  {
                    courses.map((item) => (
                      <option
                        key={item.id}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className='mt-3 mx-4'>
              <label htmlFor='message'>Dejanos tus Comentarios</label>
              <textarea 
                rows={5}
                name='message'
                placeholder='Escriba su mensaje'
                value={message}
                onChange={onInputChange}
                className='form-control' 
              />
              {
                errorsInput.message && (
                  <ValidateErrors
                    errors={errorsInput.message}
                  />
                )
              }                 
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