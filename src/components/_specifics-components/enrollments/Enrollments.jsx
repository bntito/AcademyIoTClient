import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import { useAppContext } from '../../../hooks/AppContext';

import Swal from 'sweetalert2';

export default function Enrollment({ enrollment, edit, reviewList, token, handleNavigate }) {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/enrollment`;
  const { handleClose } = useAppContext();

  // Estados locales
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(false);

  // Estado inicial del formulario
  const initialForm = {
    id: enrollment ? enrollment.id : 0,
    course: enrollment ? enrollment.course : '',
    professor: enrollment ? enrollment.professor : '',
    student: enrollment ? enrollment.student : '',
    shift: enrollment ? enrollment.shift : '',
    startDate: enrollment ? enrollment.startDate : '',
    endDate: enrollment ? enrollment.endDate : ''
  };

  // Hook de formulario personalizado
  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput
  } = useForm(initialForm, validationSchema);

  // Desestructuración de los valores del formulario
  const { course, professor, student, shift, startDate, endDate } = formData;

  // Hook de fetch personalizado
  let {
    dataServer,
    createData,
    updateData
  } = useFetch(null);

  // Manejo del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      const numError = validateForm();
      if (!numError) {
        let url = `${api}`;
        if (!edit) {
          await createData(url, formData);
        } else {
          await updateData(url, enrollment.id, formData);
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
        handleClose();
        reviewList();
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
      handleClose();
      handleNavigate('/login');
    }
  }, [dataServer]);

  // Función para obtener la lista de cursos, profesores y estudiantes
  const getCourses = async () => {
    // Obtener la lista de cursos
    let url = `${hostServer}/api/courses`;
    let response = await fetch(url);
    let respCourses = await response.json();
    if (respCourses.dataApi) {
      setCourses(respCourses.dataApi);
    }
    // Cargar la lista de profesores del primer curso por defecto
    loadTeacher(respCourses?.dataApi[0].professors);
    // Obtener la lista de estudiantes
    url = `${hostServer}/api/students`;
    response = await fetch(url);
    let respStudents = await response.json();
    if (respStudents.dataApi) {
      setStudents(respStudents.dataApi);
    }
  };

  // Función para manejar el cambio de curso y cargar los profesores correspondientes
  const handleCourseChange = (event) => {
    const selectCourse = event.target.value;
    const selectRegister = courses.filter((item) => item.name === selectCourse);
    loadTeacher(selectRegister[0].professors);
    onInputChange(event);
  };

  // Función para cargar los profesores
  const loadTeacher = (teacher) => {
    setTeachers(teacher);
  };

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
    {
      error ? (
        errorMessage()
      ) : (
        <div className='form-container'>
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
                      edit ? (
                        <option
                          value={professor}
                        >
                          {`${professor}`}
                        </option>
                      ) : (
                        teachers.map((item) => item.professor && (
                          <option
                            key={item.id}
                            value={item.name}
                          >{`${item.professor}`}
                          </option>
                        ))
                      )
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
                  className='form-control'
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