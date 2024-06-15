import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Searcher from '../../../services/searcher/Searcher';
import Pagination from '../../../services/pagination/Pagination';
import OpenModal from '../../_commons-components/modal/OpenModal';

import Enrollment from '../../_specifics-components/enrollments/Enrollments';

import Swal from 'sweetalert2';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ListEnrollment({ title }) {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/enrollments`;
  const { usersContext, navigateContext } = useUsersContext();
  const token = usersContext.token;

  // Estados para manejar la selección de elementos y la paginación
  const [selectedItems, setSelectedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPage, setItemsPage] = useState(8);

  // Hook de fetch personalizado
  let {
    dataServer,
    isLoading = false,
    getData,
    deleteData
  } = useFetch(`${api}`);

  // Filtros de búsqueda
  const filters = [
    { id: 1, name: 'course', description: 'Curso' },
    { id: 2, name: 'professor', description: 'Profesor' },
    { id: 3, name: 'student', description: 'Estudiante' },
    { id: 4, name: 'shift', description: 'Turno' }
  ];

  // Función para abrir modal de adición
  function handleAdd() {
    const title = 'Adición de Matrículas';
    if (token) {
      OpenModal(
        <Enrollment
          enrollment={''}
          edit={false}
          reviewList={updateList}
          token={token}
          handleNavigate={navigateTo}
          />,
        null,
        'medium',
        title
      );
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

  // Función para abrir modal de edición
  function handleEdit(enrollment) {
    const title = 'Edición de Matrícula';
    if (token) {
      OpenModal(
        <Enrollment
          enrollment={enrollment}
          edit={true}
          reviewList={updateList}
          token={token}
          handleNavigate={navigateTo}
        />,
        null,
        'medium',
        title
      );
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

  // Navegar a otra ruta
  const navigateTo = async (rute) => {
    await navigateContext(rute);
  };

  // Obtener matriculas desde el servidor
  const getEnrollments = async () => {
    const url = `${hostServer}/api/enrollments`;
    await getData(url);
  };

  // Actualizar lista de matriculas
  const updateList = async () => {
    await getEnrollments();
  };

  // Eliminar matricula
  const handleDelete = async (id) => {
    if (token) {
      const url = `${hostServer}/api/enrollment`;
      const deleteId = id;
      Swal.fire({
        title: 'Está seguro?',
        text: 'Desea eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: ' #d33',
        confirmButtonText: 'Sí, Eliminar'
      })
      .then((result) => {
        if (result.isConfirmed) {
          const del = async () => {
            const resp = await deleteData(url, deleteId);
            getEnrollments();
            await Swal.fire({
              title: 'Eliminado!',
              text: 'La matrícula fue eliminado',
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

  // Paginación
  const nextPage = (pagItems, pageCurrent) => {
    setItemsPage(pagItems);
    setPage(pageCurrent);
  };

  // Manejar cambio de página
  const handlePageChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
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
  }, [dataServer]);

  // Obtener lista de matriculas al montar el componente
  useEffect(() => {
    getEnrollments();
  }, []);

  return (
    <>
    <div className='login-user-container'>
      <LoginUser/>
    </div>
    <h3 className='mt-4 mb-3'>Listado de Matrículas</h3>
    {
      isLoading ? (
        <h3>Cargando...</h3>
      ) : (
        selectedItems && (
          <div className='lists'>
            <div>
              <div>{title}</div>
              <div>
                <Searcher
                  filters={filters}
                  registers={dataServer?.dataServerResult?.dataApi}
                  onChange={handlePageChange}
                />
              </div>
              <div className='add'>
                <MdOutlineAddToPhotos
                  onClick={handleAdd}
                  className='btn-add'  
                />                           
              </div>
            </div>
            <table className='table table-striped table-bordered'>
              <thead>
                <tr className='table-dark'>
                  <th scope='col'>#</th>
                  <th scope='col'>Curso</th>
                  <th scope='col'>Profesor</th>
                  <th scope='col'>Alumno</th>
                  <th scope='col'>Turno</th>
                  <th scope='col' colSpan={2}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataServer?.status === 500 ? (
                    <tr>
                      <td scope='col' colSpan={7}>
                        <h3>No hay información para esta entidad</h3>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((enrollment) => {
                      return (
                        <tr key={enrollment.id}>
                          <td data-label='#'>{enrollment.id}</td>
                          <td data-label='Curso'>{enrollment.course}</td>
                          <td data-label='Profesor'>{`${enrollment.professor}`}</td>
                          <td data-label='Estudiante'>{enrollment.student}</td>
                          <td data-label='Turno'>{enrollment.shift}</td>
                          <td data-label='Editar' className='td-icon'>
                            <FaRegEdit
                              onClick={() => handleEdit(enrollment)}
                              className='icon'
                            />
                          </td>
                          <td data-label='Eliminar' className='td-icon'>
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(enrollment.id)}
                              className='icon'
                            />
                          </td>                          
                        </tr>
                      );
                    })
                  )
                }
              </tbody>
            </table>
            {
              dataServer?.dataServerResult?.dataApi && (
                <Pagination
                  items={dataServer?.dataServerResult?.dataApi}
                  page={page}
                  pagItems={itemsPage}
                  nextPage={nextPage}
                  onPageChange={handlePageChange}
                />
              )
            }
          </div>
        )
      )
    }
    </>
  );
}