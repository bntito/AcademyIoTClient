import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Searcher from '../../../services/searcher/Searcher';
import Pagination from '../../../services/pagination/Pagination';
import OpenModal from '../../_commons-components/modal/OpenModal';

import Student from '../../_specifics-components/students/Student';

import Swal from 'sweetalert2';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ListStudent({ title }) {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/students`;
  const { usersContext, navigateContext } = useUsersContext();
  const token = usersContext.token;
  const userId = usersContext.id;

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
    { id: 1, name: 'dni', description: 'Documento' },
    { id: 2, name: 'lastname', description: 'Apellido' },
    { id: 3, name: 'email', description: 'Email' },
    { id: 4, name: 'phone', description: 'Celular' }
  ];

  // Función para abrir modal de adición
  function handleAdd() {
    const title = 'Adición de Estudiante';
    if (token) {
      OpenModal(
        <Student
          student={''}
          edit={false}
          reviewList={updateList}
          token={token}
          userId={userId}
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
  function handleEdit(student) {
    const title = 'Edición de Estudiante';
    if (token) {
      if (student.email === usersContext.email) {
        OpenModal(
          <Student
            student={student}
            edit={true}
            reviewList={updateList}
            token={token}
            userId={userId}
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
          title: 'Solo puedes editar el Estudiante con el que te haz logeado',
          showConfirmButton: false,
          timer: 2000
        });
      }
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

  // Obtener estudiantes desde el servidor
  const getStudents = async () => {
    const url = `${hostServer}/api/students`;
    await getData(url);
  };

  // Actualizar lista de estudiantes
  const updateList = async () => {
    await getStudents();
  };

  // Eliminar estudiante
  const handleDelete = async (id) => {
    if (token) {
      const url = `${hostServer}/api/student`;
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
            const resp = await deleteData(url, deleteId, token);
            getStudents();
            await Swal.fire({
              title: 'Eliminado!',
              text: 'El estudiante fue eliminado',
              icon: 'success'
            });
          };
          del();
        };
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

  // Obtener lista de estudiantes al montar el componente
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
    <div className='login-user-container'>
      <LoginUser/>
    </div>
    <h3 className='mt-4 mb-3'>Listado de Estudiantes</h3>
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
                  <th scope='col'>Documento</th>
                  <th scope='col'>Nombre</th>
                  <th scope='col'>Correo Electrónico</th>
                  <th scope='col'>Celular</th>
                  <th scope='col' colSpan={3}>Acción</th>
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
                    selectedItems.map((student) => {
                      return (
                        <tr key={student.id}>
                          <td data-label='#'>{student.id}</td>
                          <td data-label='Documento'>{student.dni}</td>
                          <td data-label='Nombre'>{`${student.name} ${student.lastname}`}</td>
                          <td data-label='Correo Electrónico'>{student.email}</td>
                          <td data-label='Celular'>{student.phone}</td>
                          <td data-label='Editar' className='td-icon'>
                            <FaRegEdit
                              onClick={() => handleEdit(student)}
                              className='icon'
                            />
                          </td>
                          <td data-label='Eliminar' className='td-icon'>
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(student.id)}
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