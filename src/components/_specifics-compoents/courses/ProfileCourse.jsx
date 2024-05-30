import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { useForm } from '../../../hooks/useForm';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import ValidateErrors from '../../../services/validations/ValidateErrors';
import validationSchema from '../../../services/validations/validationSchema';

import Swal from 'sweetalert2';
import { BsPersonAdd } from "react-icons/bs";

export default function ProfileCourse() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/course`;
  const { usersContext } = useUsersContext();
  const token = usersContext.token;
  let urlImg = '';
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [course, setCourse] = useState({});
  const initialForm = {
    id: course && course.id ? course.id : '',
    code: course && course.code ? course.code : '',
    name: course && course.name ? course.name : '',
    description: course && course.description ? course.description : '',
    cost: course && course.cost ? course.cost : '',
    condition: course && course.condition ? course.condition : '',
    duration: course && course.duration ? course.duration : '',
    qualification: course && course.qualification ? course.qualification : ''
  };

  const [imageCourse, setImageCourse] = useState(null);
  const [urlImageCourse, setUrlImageCourse] = useState(course ? course.urlImg : null);

  const [professors, setProfessors] = useState([]);

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

  const handleImg = (e) => {
    setImageCourse(e.target.files[0]);
  };

  let {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm,
    fillForm
  } = useForm(initialForm, validationSchema);

  const { id, code, name, description, cost, condition, duration, qualification } = formData;

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
    handleInputChange();
    if (!numError) {
      await handleSubmitImg();
      let urlServer = `${api}`;
      formData = {
        ...formData,
        token
      };
      formData = {
        ...formData,
        urlImg
      };
      formData = {
        ...formData,
        professors
      };
      await updateData(urlServer, course.id, formData);
    } else {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Debes corregir la información para poder registrarla',
        showConfirmButton: false,
        timer: 3000
      });
    };
  };

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
        };
        if (nameExist) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'El profesor ya fue incluído',
            timer: 2000
          });
        };
        return prevProfessors;
      };
      return prevProfessors.map((professor) => {
        if (professor.id === id) {
          return {
            ...professor,
            [field] : value
          };
        };
        return professor;
      });
    });
  };

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

  const getProfessors = async () => {
    const api = `${hostServer}/api/professors`;
    const response = await fetch(api);
    const responseData = await response.json();
    if (async () => await responseData.dataApi) {
      setTeachers(responseData.dataApi);
    };
  };

  const getCourses = async (event) => {
    let url = `${api}/code/${event.target.value}`;
    const resp = await getData(url);
    if (async () => resp) {
      setCourse(resp?.dataServerResult?.dataApi);
    } else {
      Swal.fire({
        position: 'top',
        icon: 'warning',
        title: dataServer?.dataServerResult?.message,
        showCloseButton: false,
        timer: 2000
      });
    };
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
    fillForm(course);
  }, [course]);

  useEffect(() => {
    getProfessors();
  }, []);

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
          <h3>Modificación de Cursos</h3>
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
                      onBlur={getCourses}
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
                    <label htmlFor='name'>Nombres</label>
                    <input 
                      type='text'
                      placeholder='Ingrese Nombres'
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
                <div>
                  <label htmlFor='file'></label>
                  <label htmlFor='file-input'>
                    <span>Subir Fotos</span>
                  </label>
                  <div className='container-flex-column'>
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
            <section >
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
                      >
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
            <div className='m-auto div-70 mt-5'>
              <button 
                onClick={handleSubmit}
                className='btn btn-primary w-100'>Actualizar</button>
            </div>
          </form>
        </div>
      )
    }
    </>
  );
};