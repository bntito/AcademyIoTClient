import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Swal from 'sweetalert2';
import './views.css';

export default function ViewCourse() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const { id } = useParams();
  const api = `${hostServer}/api/course/${id}`;
  const [course, setCourse] = useState(null);
  const [professors, setProfessors] = useState([]);

  let {
    dataServer,
    isLoading = false,
    getData
  } = useFetch(`${api}`);

  const getCourse = async () => {
    await getData(api);
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
    }
    if (dataServer?.dataServerResult?.dataApi) {
      setCourse(dataServer.dataServerResult.dataApi);
      setProfessors(dataServer.dataServerResult.dataApi.professors);
    }
  }, [dataServer]);

  useEffect(() => {
    getCourse();
  }, [id]);

  if (!course) {
    return <div className="not-found">Curso no encontrado</div>;
  }

  return (
    <>
      {
        isLoading ? (
          <h3>Cargando...</h3>
        ) : (
          <>
            <div className='login-user-container'>
              <LoginUser />
            </div>
            <h3 className="course-title">Visualización de Curso</h3>
            <div className='form-container'>
              <small className="course-code">Código: {course.code}</small>
              <div className='header-view'>
                <div className='title-container mt-2'>
                  <img 
                    src={`${hostServer}${course.urlImg}`} 
                    alt={course.name}
                    className='img-view'
                  />
                  <h1 className='mx-3'>{course.name}</h1>
                </div>
                <h5 className={course.condition == 'Activo' ? 'activ' : 'inactive'}>Estado: {course.condition}</h5>
              </div>
              <div className='details-view'>
                <div className='description-view'>
                  <h6><i>Costo del Curso</i></h6>
                  <p className='mx-3'>{course.cost}</p>
                </div>
                <div className='description-view'>
                  <h6><i>Profesores del Curso</i></h6>
                  {
                    professors.map((professor, index) => (
                      <p
                        key={index}
                        className='mx-3'
                      >
                        {professor.professor}
                      </p>
                    ))
                  }
                </div>
                <div className='description-view'>
                  <h6><i>Duración</i></h6>
                  <p className='mx-3'>{course.duration}</p>
                  <h6><i>Calificación</i></h6>
                  <p className='mx-3'>{course.qualification}</p>
                </div>
              </div>
              <div className='description-description-view'>
                <h6><i>Descripción del Curso</i></h6>
                <p className='mx-3'>{course.description}</p>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};