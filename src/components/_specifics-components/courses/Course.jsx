import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import { useAppContext } from '../../../hooks/AppContext';

import Swal from 'sweetalert2';
import { BsPersonAdd } from 'react-icons/bs';
import { AiOutlineUserDelete } from 'react-icons/ai';

export default function Course({ course, edit, reviewList, token, handleNavigate }) {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/course`;
  const { handleClose } = useAppContext();

  // Estados locales
  const [teachers, setTeachers] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState(false);
  const [imageCourse, setImageCourse] = useState(null);
  const [urlImageCourse, setUrlImageCourse] = useState(course ? course.urlImg : null);
  let urlImg = '';

  // Formulario inicial para la creación del curso
  const initialForm = {
    id: course ? course.id : '',
    code: course ? course.code : '',
    name: course ? course.name : '',
    description: course ? course.description : '',
    cost: course ? course.cost : '',
    condition: course ? course.condition : '',
    duration: course ? course.duration : '',
    qualification: course ? course.qualification : '',
    prominent: course ? course.prominent : false
  };

  // Función para agregar un profesor al curso
  const addProfessor = () => {
    const newProfessor = {
      id: professors.length + 1,
      professor: '',
      hourCost: ''
    };
    setProfessors([
      ...professors,
      newProfessor
    ]);
  };

  // Manejo de cambios en la imagen del curso
  const handleImg = (e) => {
    setImageCourse(e.target.files[0]);
  };

  // Hook de formulario personalizado
  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput
  } = useForm(initialForm, validationSchema);

  // Desestructuración de los valores del formulario
  const { code, name, description, cost, condition, duration, qualification, prominent } = formData;

  // Hook de fetch personalizado
  let {
    dataServer,
    createData,
    updateData,
    deleteTeacher
  } = useFetch(null);

  // Manejo del submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      const numError = validateForm();
      handleInputChange();
      if (!numError) {
        await handleSubmitImg();
        formData = {
          ...formData,
          token,
          urlImg: urlImg || course.urlImg,
          professors
        };
        let urlServer = `${api}`;
        if (!edit) {
          await createData(urlServer, formData);
        } else {
          await updateData(urlServer, course.id, formData);
        }
      } else {
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: 'Debes corregir la información para poder registrarla',
          showConfirmButton: false,
          timer: 3000
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

  // Manejo de cambios en el formulario
  const handleInputChange = (id, field, value) => {
    setProfessors((prevProfessors) => {
      const nameExist = prevProfessors.find((professor) => professor.professor === value);
      const previusEmptyHourCost = prevProfessors[id - 2] && !prevProfessors[id - 2].hourCost;
      if (nameExist || previusEmptyHourCost) {
        if (previusEmptyHourCost) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Debe indicar el costo hora del profesor anterior',
            showConfirmButton: false,
            timer: 2000
          });
        }
        if (nameExist) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'El profesor ya fue incluído',
            timer: 2000
          });
        }
        return prevProfessors;
      }
      return prevProfessors.map((professor) => {
        if (professor.id === id) {
          return {
            ...professor,
            [field] : value
          };
        }
        return professor;
      });
    });
  };

  // Manejo del el envío de la imagen del curso
  const handleSubmitImg = async () => {
    const formData = new FormData();
    formData.append('name-field-file', imageCourse);
    const urlServer = `${hostServer}/api/image`;
    try {
      const response = await fetch(urlServer, {
        method: 'POST',
        body: formData
      });
      const resp = await response.json();
      urlImg = await resp.urlImg;
    } catch (error) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2000
      });
    };
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

  // Función para obtener los profesores
  const getProfessors = async () => {
    const api = `${hostServer}/api/professors`;
    const response = await fetch(api);
    const responseData = await response.json();
    if (async () => await responseData.dataApi) {
      setTeachers(responseData.dataApi);
    }
  };

  // Función para manejar la eliminación de un profesor del curso
  const handleDeleteTeacher = async (id) => {
    if (token) {
      const url = `${hostServer}/api/course/deleteteacher`;
      const teacherId = id;
      const courseId = course.id;
      Swal.fire({
        title: 'Está seguro?',
        text: 'Desea eliminar profesor del curso?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: ' #d33',
        confirmButtonText: 'Sí, Eliminar'
      })
      .then((result) => {
        if(result.isConfirmed) {
          const del = async () => {
            const resp = await deleteTeacher(url, teacherId, courseId, token);
            await Swal.fire({
              title: 'Eliminado!',
              text: dataServer?.dataServerResult.message,
              icon: 'success'
            });
          };
          del();
        }
      });
    } else {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Debe loguearse para utilizar esta función',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  // Efecto para obtener los profesores al montar el componente
  useEffect(() => {
    getProfessors();
    edit ? setProfessors(course.professors) : null;
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
        <div className='pt-5 px-5 pb-3'>
          <form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
          >
            <section className='media850-col gap-2'>
              <div className='w-100'>
                <div>
                  <div>
                    <label htmlFor='code'>Código del curso</label>
                    <input 
                      type='text'
                      placeholder='Ingrese el código asignado al curso'
                      name='code'
                      value={code}
                      onChange={onInputChange}
                      className='form-control'
                    />
                    {
                      errorsInput.code && (
                        <ValidateErrors
                          errors={errorsInput.code}
                        />
                      )
                    }
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor='name'>Nombre del Curso</label>
                    <input 
                      type='text'
                      placeholder='Ingrese Nombre'
                      name='name'
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
                </div>
                <div>
                  <div>
                    <label htmlFor='cost'>Costo del curso</label>
                    <input 
                      type='text'
                      placeholder='Ingrese el costo del curso'
                      name='cost'
                      value={cost}
                      onChange={onInputChange}
                      className='form-control'
                    />
                    {
                      errorsInput.cost && (
                        <ValidateErrors
                          errors={errorsInput.cost}
                        />
                      )
                    }
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor='condition'>Estatus</label>
                    <select 
                      name='condition' 
                      value={condition}
                      onChange={onInputChange}
                      className='form-control'
                    >
                      <option>Selecione opción</option>
                      <option>Activo</option>
                      <option>No Activo</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor='duration'>Duración del curso</label>
                    <input 
                      type='text'
                      placeholder='Ingrese la duración del curso'
                      name='duration'
                      value={duration}
                      onChange={onInputChange}
                      className='form-control'
                    />
                    {
                      errorsInput.duration && (
                        <ValidateErrors
                          errors={errorsInput.duration}
                        />
                      )
                    }
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor='qualification'>Clasificación del curso</label>
                    <input 
                      type='text'
                      placeholder='Ingrese la duración del curso'
                      name='qualification'
                      value={qualification}
                      onChange={onInputChange}
                      className='form-control'
                    />
                    {
                      errorsInput.qualification && (
                        <ValidateErrors
                          errors={errorsInput.qualification}
                        />
                      )
                    }
                  </div>
                </div>
              </div>
              <div className='w-100'>
                <div>
                  <div className='container-flex-column'>
                    <label htmlFor='description'>Descripción Ampliada</label>
                    <textarea 
                      name='description' 
                      rows='5'
                      placeholder='Indique los detalles del curso'
                      value={description}
                      onChange={onInputChange}
                      className='form-control'
                    />
                    {
                      errorsInput.description && (
                        <ValidateErrors
                          errors={errorsInput.description}
                        />
                      )
                    }
                  </div>
                </div>
                <div className='div-flex mt-3'>
                  <label htmlFor='file'></label>
                  <label htmlFor='file-input'>
                    <span>Subir Fotos</span>
                  </label>
                  <div className='container-flex-column div-upload mt-4'>
                    <label htmlFor='file-input'>
                      <input 
                        type='file'
                        name='name-field-file'
                        accept='.jpg,.jpeg,.png,.webp'
                        onChange={handleImg}
                        className='form-control'
                      />
                    </label>
                    <span>
                      {
                        imageCourse ? (
                          <img
                            src={URL.createObjectURL(imageCourse)}
                            alt='file'
                            className='uploadImg'
                          />
                        ) : (
                          <img
                            src={`${hostServer}${urlImageCourse}`}
                            alt='file'
                            className='uploadImg'
                          />
                        )
                      }
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className='mt-2'>
                <label htmlFor='teacher'>Asignación de Profesores</label>
                  <BsPersonAdd
                    onClick={addProfessor}
                    className='icon-add-professor'
                  />
                <div className='div-flex gap-2 mt-3'>
                  {
                    professors.map((professor, index) => (
                      <div
                        key={index}
                        className='container-teacher'
                      >
                        <div>
                          <AiOutlineUserDelete
                            onClick={() => handleDeleteTeacher(professor.id, course.id)}
                            className='delete-teacher'
                          />                        
                        </div>
                        <label htmlFor={`label-name-${professor.id}`}>Profesor</label>
                        <select
                          name={`label-name-${professor.id}`}
                          value={professor.professor}
                          onChange={(e) => handleInputChange(professor.id, 'professor', e.target.value)}
                          className='form-control'
                        >
                          <option>Seleccione una opción</option>
                          {
                            teachers?.map((item) => (
                              <option key={item.id}>{`${item.name} ${item.lastname}`}</option>
                            ))
                          }
                        </select>
                        <label htmlFor={`label-cost-${professor.id}`}>Costo Hora</label>
                        <input
                          type='text'
                          name={`input-costo-${professor.id}`}
                          value={professor.hourCost}
                          onChange={(e) => handleInputChange(professor.id, 'hourCost', e.target.value)}
                          className='form-control'
                        />
                      </div>
                    ))
                  }
                </div>  
              </div>
            </section>
            <div className='div-prominent mt-4'>
              <label htmlFor='prominent'>Curso Destacado</label>
              <input 
                type='checkbox'
                name='prominent'
                checked={prominent}
                onChange={onInputChange}
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