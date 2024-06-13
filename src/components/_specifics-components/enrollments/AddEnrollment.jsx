import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';

export default function Enrollment() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/enrollment`;
  const navigate = useNavigate();
  const { usersContext } = useUsersContext();
  const token = usersContext.token;
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollment, setEnrollment] = useState({});
  const [error, setError] = useState(false);
  const initialForm = {
    id: enrollment && enrollment.id ? enrollment.id : 0,
    course: enrollment && enrollment.id ? enrollment.course : '',
    professor: enrollment && enrollment.id ? enrollment.professor : '',
    student: enrollment && enrollment.id ? enrollment.student : '',
    shift: enrollment && enrollment.id ? enrollment.shift : '',
    startDate: enrollment && enrollment.id ? enrollment.startDate : '',
    endDate: enrollment && enrollment.id ? enrollment.endDate : ''
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm
  } = useForm(initialForm, validationSchema);

  const { course, professor, student, shift, startDate, endDate } = formData;

  let {
    dataServer,
    createData
  } = useFetch(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
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
    } else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: 'Debe loguearse para utilizar esta función',
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/login'); 
    }
  };

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
        navigate('/enrollmentsList');
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
      navigate('/login');
    }
  }, [dataServer]);

  const getCourses = async () => {
    let url = `${hostServer}/api/courses`;
    let response = await fetch(url);
    let respCourses = await response.json();
    if (respCourses.dataApi) {
      setCourses(respCourses.dataApi);
    }

    loadTeacher(respCourses?.dataApi[0].professors);

    url = `${hostServer}/api/students`;
    response = await fetch(url);
    let respStudents = await response.json();
    if (respStudents.dataApi) {
      setStudents(respStudents.dataApi);
    }
  };

  const handleCourseChange = (event) => {
    const selectCourse = event.target.value;
    const selectRegister = courses.filter((item) => item.name === selectCourse);
    loadTeacher(selectRegister[0].professors);
    onInputChange(event);
  };

  const loadTeacher = (teacher) => {
    setTeachers(teacher);
  };

  useEffect(() => {
    getCourses();
  }, []);

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
    <div className='login-user-container'>
      <LoginUser/>
    </div>
    {
      error ? (
        errorMessage()
      ) : (
        <div className='form-container'>
          <h3>Adición de Matrículas</h3>
          <form
            onSubmit={handleSubmit}
          >
            <div>           
              <div className='div-70 mb-3'>
                <label htmlFor='course'>Nombre del Curso</label>
                <select 
                  name='course'
                  value={course}
                  onChange={handleCourseChange}
                  className='form-control'
                >
                  <option>Seleccione una opción</option>
                  {
                    courses.map((item) => (
                      <option
                        key={item.id}
                        value={item.name}
                      >{`${item.name}`}
                      </option>
                    ))
                  }
                </select>
              </div>        
              <div className='div-flex gap-2 media850-col'>
                <div className='w-100'>
                  <label htmlFor='professor'>Nombre del Profesor asignado al Curso</label>
                  <select 
                    name='professor'
                    value={professor}
                    onChange={onInputChange}
                    className='form-control'
                  >
                    <option>Seleccione el Profesor</option>
                    {
                      teachers.map((item) => item.professor && (
                        <option
                          key={item.id}
                          value={item.name}
                        >{`${item.professor}`}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className='w-100'>
                <label htmlFor='student'>Nombre del Alumno</label>
                  <select 
                    name='student'
                    value={student}
                    onChange={onInputChange}
                    className='form-control'
                  >
                    <option>Seleccione el Alumno</option>
                    {
                      students.map((item) => (
                        <option
                          key={item.id}
                          value={item.name}
                        >{`${item.name} ${item.lastname}`}
                        </option>
                      ))
                    }
                  </select>                  
                </div>
              </div>
            </div>
            <div className='div-flex div-center mt-3 mb-3'>
              <div>
                <label htmlFor='shift'>Seleccione el Turno</label>
                <select 
                  name='shift'
                  value={shift}
                  onChange={onInputChange}
                >
                  <option>Seleccione opción</option>
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>                  
              </div>
            </div>
            <div className='div-flex gap-2 media850-col'>
              <div className='w-100'>
                <label htmlFor='startDate'>Fecha de Inicio</label>
                <input
                  type='text'
                  name='startDate'
                  placeholder='Indique la fecha de inicio'
                  value={startDate}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.startDate && (
                    <ValidateErrors
                      errors={errorsInput.startDate}
                    />
                  )
                }
              </div>
              <div className='w-100'>
                <label htmlFor='endDate'>Fecha de Finalización</label>
                <input
                  type='text'
                  name='endDate'
                  placeholder='Indique la fecha de Finalización'
                  value={endDate}
                  onChange={onInputChange}
                  className='form-control'
                />
                {
                  errorsInput.endDate && (
                    <ValidateErrors
                      errors={errorsInput.endDate}
                    />
                  )
                }
              </div>
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