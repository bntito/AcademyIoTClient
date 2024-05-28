import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Swal from 'sweetalert2';

export default function ViewCourses() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/courses`;
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const initialForm = {
    name: '',
  };

  let {
    formData,
    onInputChange,
    clearForm
  } = useForm(initialForm);

  const { name: nameCourse } = formData;

  let {
    dataServer,
    isLoading = false,
    getData
  } = useFetch(`${api}`);

  const getCourses = async () => {
    await getData(api);
  };

  const handleCourseClick = (id) => {
    navigate(`/courseView/${id}`);
  };

  useEffect(() => {
    if (dataServer?.message || dataServer?.message != undefined) {
      Swal.fire(dataServer?.message);
    }
    if (dataServer?.status === 400 || dataServer?.status === 401) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: dataServer?.dataServerResult.message,
        showConfirmButton: false,
        timer: 2000
      });
    };
  }, [dataServer]);

  useEffect(() => {
    if (dataServer?.dataServerResult?.dataApi) {
      setCourses(dataServer.dataServerResult.dataApi);
      setFilterCourses(dataServer.dataServerResult.dataApi);
    }
  }, [dataServer]);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    setFilterCourses(
      courses.filter((course) => course.name.toLowerCase().includes(nameCourse.toLowerCase()))
    );
  }, [nameCourse, courses]);

  return (
    <>
    <div className='login-user-container'>
      <LoginUser/>
    </div>
    <h3 className='mt-4 mb-3'>Presentación de Cursos</h3>
    <div className='courses-container-view'>
      <div className='form-container container-view'>
        <div className='div-70'>
          <label htmlFor='search'>Buscar Curso</label>
          <input 
            type='text'
            name='name'
            value={nameCourse}
            onChange={onInputChange}
            className='form-control'
          />
        </div>
        <div className='form-container-inside mt-4'>
          {
            filterCourses.map((course, index) => (
              <div
                key={index}
                className='mb-3'
              >
                <small>{`Código del Curso: ${course.code}`}</small>
                <div className='card text-center'>
                  <div className='card-header'>
                    <ul className='nav nav-tabs card-header-tabs'>
                      <li className='nav-item'>
                        <a className='nav-link active' aria-current='true' href='#'>Curso</a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>Profesores</a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link disabled' href='#' tabIndex='-1' aria-disabled='true'>Precio</a>
                      </li>
                    </ul>
                  </div>
                  <div className='card-body card-background'>
                    <div>
                    <img 
                      src={`${hostServer}${course.urlImg}`}
                      alt={course.name}
                      className='img-view'
                    />
                    </div>
                    <h3 className='card-title'>{course.name}</h3>
                    <p className='card-text'>{course.description}</p>
                    <div
                      href='#' className='btn btn-primary'
                      onClick={() => handleCourseClick(course.id)}
                    >
                      Ver detalles del Curso
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  );
}