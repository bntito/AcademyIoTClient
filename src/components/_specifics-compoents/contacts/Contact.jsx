import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useAppContext } from '../../../hooks/AppContext';

import Swal from 'sweetalert2';

export default function Contact({ contact, edit, reviewList }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/contact`;
  const { handleClose } = useAppContext();
  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const initialForm = {
    id: contact ? contact.id : '',
    name: contact ? contact.name : '',
    email: contact ? contact.email : '',
    phone: contact ? contact.phone : '',
    city: contact ? contact.city : '',
    course: contact ? contact.course : '',
    message: contact ? contact.message : ''
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
      if (!edit) {
        await createData(url, formData);
      } else {
        await updateData(url, contact.id, formData);
      }
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
    };
  }, [dataServer]);

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
    getCourses();
  }, []);

  return (
    <>
    {
      error ? (
        errorMessage()
      ) : (
        <div className='form-container'>
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
              {
                edit ? (
                  <button type='submit' className='btn btn-primary w-100'>Actualizar</button>
                ) : (
                  <button type='submit' className='btn btn-primary w-100'>Agregar</button>
                )
              }
            </div>       
          </form>
        </div>
      )
    }
    </>
  );
}