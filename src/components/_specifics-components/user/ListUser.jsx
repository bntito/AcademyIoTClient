import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import { useUsersContext } from '../../../hooks/UserContext';
import LoginUser from '../../_commons-components/loginUser/LoginUser';

import Searcher from '../../../services/searcher/Searcher';
import Pagination from '../../../services/pagination/Pagination';
import OpenModal from '../../_commons-components/modal/OpenModal';

import User from '../../_specifics-components/user/User';

import Swal from 'sweetalert2';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ListUser({ title }) {
  // Host del servidor desde las variables de entorno y contexto de usuario
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/users`;
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
    { id: 1, name: 'name', description: 'Nombre' },
    { id: 2, name: 'email', description: 'Email' },
    { id: 3, name: 'phone', description: 'Celular' }
  ];

  // Función para abrir modal de adición
  function handleAdd() {
    const title = 'Adición de Usuarios';
    if (token) {
      OpenModal(
        <User
          user={''}
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
  function handleEdit(user) {
    const title = 'Edición de Usuarios';
    if (token) {
      OpenModal(
        <User
          user={user}
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

  // Obtener usuarios desde el servidor
  const getUsers = async () => {
    const url = `${hostServer}/api/users`;
    await getData(url);
  };

  // Actualizar lista de usuarios
  const updateList = async () => {
    await getUsers();
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (token) {
      const url = `${hostServer}/api/user`;
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
            getUsers();
            await Swal.fire({
              title: 'Eliminado!',
              text: 'El usuario fue eliminado',
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

  // Obtener lista de usuarios al montar el componente
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <div className='login-user-container'>
      <LoginUser/>
    </div>
    <h3 className='mt-4 mb-3'>Listado de Usuarios</h3>
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
            <div className='table-responsive'>
              <table className='table table-striped table-bordered'>
                <thead>
                  <tr className='table-dark'>
                    <th scope='col'>#</th>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Correo Electrónico</th>
                    <th scope='col'>Ciudad</th>
                    <th scope='col' colSpan={3}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataServer?.status === 500 ? (
                      <tr>
                        <td scope='col' colSpan={7}>
                          <h3 className='text-center'>No hay información para esta entidad</h3>
                        </td>
                      </tr>
                    ) : (
                      selectedItems.map((user) => {
                        return (
                          <tr key={user.id}>
                            <td data-label='#'>{user.id}</td>
                            <td data-label='Nombre'>{`${user.name} ${user.lastname}`}</td>
                            <td data-label='Correo Electrónico'>{user.email}</td>
                            <td data-label='Ciudad'>{user.city}</td>
                            <td data-label='Editar' className='td-icon'>
                              <FaRegEdit
                                onClick={() => handleEdit(user)}
                                className='icon'
                              />
                            </td>
                            <td data-label='Eliminar' className='td-icon'>
                              <RiDeleteBin6Line
                                onClick={() => handleDelete(user.id)}
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
            </div>
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