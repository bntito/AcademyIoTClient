import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';
import { useParams } from 'react-router-dom';

import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Swal from 'sweetalert2';
import './views.css';

export default function ViewCourse() {
  const { id } = useParams();
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
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
    };
  }, [dataServer]);

  useEffect(() => {
    if (dataServer?.dataServerResult?.dataApi) {
      setCourse(dataServer.dataServerResult.dataApi);
      setProfessors(dataServer.dataServerResult.dataApi.professors);
    }
  }, [dataServer]);

  useEffect(() => {
    getCourse();
  }, [id]);

  if (isLoading) {
    return <div>Cargando...</div>;
  };

  if (!course) {
    return <div>Curso no encontrado</div>;
  };

  console.log(dataServer.dataServerResult.dataApi)

  return (
    <>
    <div className='login-user-container'>
      <LoginUser />
    </div>
    <h3>Visualización de Curso</h3>
    <div className='form-container'>
      <small>Código: {course.code}</small>
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
      <div className='description-view'>
        <h6><i>Descripción del Curso</i></h6>
        <p className='mx-3'>{course.description}</p>
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
    </div>
    </>
  );
};