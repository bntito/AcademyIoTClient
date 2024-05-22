import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import BackButton from '../../../services/backButton/BackButton';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';

export default function Contact() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/contact`;
  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const [contact, setContact] = useState({});
  const initialForm = {
    id: contact && contact.id ? contact.id : '',
    name: contact && contact.name ? contact.name : '',
    email: contact && contact.email ? contact.email : '',
    phone: contact && contact.phone ? contact.phone : '',
    city: contact && contact.city ? contact.city : '',
    course: contact && contact.course ? contact.course : '',
    message: contact && contact.message ? contact.message : ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm);

  const { id, name, email, phone, city, course, message } = formData;

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
        title: 'Debes corregir la información para poder registrarla',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

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
    };
  }, [dataServer]);

  useEffect(() => {
    getCourses();
  }, []);

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
            <div className='div-flex gap-2'>
              <div className='w-50'>
                <label htmlFor='name'>Nombre Completo</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Ingrese nombres'
                  value={name}
                  onChange={onInputChange}
                  className='form-control'
                />
              </div>
              <div className='w-50'>
                <label htmlFor='email'>Correo Electrónico</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Ingrese el correo electrónico'
                  value={email}
                  onChange={onInputChange}
                  className='form-control'
                />
              </div>
            </div>
            <div>
              <div className='div-30'>
                <label htmlFor='phone'>Número de celular</label>
                <input
                  type='text'
                  name='phone'
                  placeholder='Ingrese número telefónico'
                  value={phone}
                  onChange={onInputChange}
                  className='form-control'
                />
              </div>
              <div className='div-30'>
                <label htmlFor='city'>Ciudad</label>
                <input
                  type='text'
                  name='city'
                  placeholder='Ingrese ciudad'
                  value={city}
                  onChange={onInputChange}
                  className='form-control'
                />
              </div>
            </div>
            <div>
              <div className='div-70'>
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
            <div className='mt-3 mx-5'>
              <label htmlFor='message'>Dejanos tus Comentarios</label>
              <textarea 
                rows={5}
                name='message'
                placeholder='Escriba su mensaje'
                value={message}
                onChange={onInputChange}
                className='form-control' 
              />
            </div>
            <div className='w-300px mt-5'> 
              <button type='submit' className='btn btn-primary w-100'>Agregar</button>
            </div>       
          </form>
        </div>
      )
    }
    </>
  );
}