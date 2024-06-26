import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Swal from 'sweetalert2';

export default function ViewCourses() {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/courses`;
  const navigate = useNavigate();

  // Estados locales
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const initialForm = { name: '' };
  const [activeTab, setActiveTab] = useState('course');

  // Función para cambiar la pestaña activa
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Campos para omitir la validación
  const fieldsToSkipValidation = ['name'];

  // Hook de formulario personalizado
  let {
    formData,
    onInputChange
  } = useForm(initialForm, fieldsToSkipValidation);

  // Nombre del curso para filtrar
  const { name: nameCourse } = formData;

  // Hook de fetch personalizado
  let {
    dataServer,
    isLoading = false,
    getData
  } = useFetch(`${api}`);

  // Obtener cursos desde el servidor
  const getCourses = async () => {
    await getData(api);
  };

  // Redireccionar a la vista de detalles del curso al hacer clic en un curso
  const handleCourseClick = (id) => {
    navigate(`/courseView/${id}`);
  };

  // Efecto para manejar la respuesta del servidor
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
    }
    if (dataServer?.dataServerResult?.dataApi) {
      setCourses(dataServer.dataServerResult.dataApi);
      setFilterCourses(dataServer.dataServerResult.dataApi);
    }
  }, [dataServer]);

  // Efecto para filtrar los cursos por nombre
  useEffect(() => {
    setFilterCourses(
      courses.filter((course) => course.name.toLowerCase().includes(nameCourse.toLowerCase()))
    );
  }, [nameCourse, courses]);

  // Obtener lista de cursos al montar el componente
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <>
      {
        isLoading ? (
          <h3>Cargando....</h3>
        ) : (
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
                    placeholder='Ingrese Nombre del Curso'
                    className='form-control'
                  />
                </div>
                <div className='form-container-inside mt-4'>
                {
                  filterCourses.map((course, index) => (
                    <div key={index} className='mb-3'>
                      <small>{`Código del Curso: ${course.code}`}</small>
                      <div className='card text-center'>
                        <div className='card-header'>
                          <ul className='nav nav-tabs card-header-tabs'>
                            <li className='nav-item'>
                              <a
                                className={`nav-link ${activeTab === 'course' ? 'active' : ''}`}
                                onClick={() => handleTabChange('course')}
                                href='#'
                              >
                                Curso
                              </a>
                            </li>
                            <li className='nav-item'>
                              <a
                                className={`nav-link ${activeTab === 'professors' ? 'active' : ''}`}
                                onClick={() => handleTabChange('professors')}
                                href='#'
                              >
                                Profesores
                              </a>
                            </li>
                            <li className='nav-item'>
                              <a
                                className={`nav-link ${activeTab === 'price' ? 'active' : ''}`}
                                onClick={() => handleTabChange('price')}
                                href='#'
                              >
                                Precio
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className='card-body card-background'>
                          {
                            activeTab === 'course' && (
                              <>
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
                              </>
                            )
                          }
                          {
                            activeTab === 'professors' && (
                              <>
                                <h3 className='card-title'>{`Profesores del curso ${course.name}`}</h3>
                                <div className='mb-4'>
                                  {
                                    course.professors && course.professors.map((professor, index) => (
                                      <p
                                        key={index}
                                        className='mx-3'
                                      >
                                        {professor.professor}
                                      </p>
                                    ))
                                  }                          
                                </div>
                                <div
                                  href='#' className='btn btn-primary'
                                  onClick={() => handleCourseClick(course.id)}
                                >
                                  Ver detalles del Curso
                                </div>                      
                              </>
                            )
                          }
                          {
                            activeTab === 'price' && (
                              <>
                                <div>
                                  <img
                                    src={`${hostServer}${course.urlImg}`}
                                    alt={course.name}
                                    className='img-view'
                                  />
                                </div>
                                <h3 className='card-title'>{course.name}</h3>
                                <h5 className='card-text mb-4'>{`Precio del curso $${course.cost}`}</h5>
                                <div
                                  href='#' className='btn btn-primary'
                                  onClick={() => handleCourseClick(course.id)}
                                >
                                  Ver detalles del Curso
                                </div>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}