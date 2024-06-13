import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import { useUsersContext } from '../../../hooks/UserContext';

import BackButton from '../../../services/backButton/BackButton';
import Searcher from '../../../services/searcher/Searcher';
import Pagination from '../../../services/pagination/Pagination';
import OpenModal from '../../_commons-components/modal/OpenModal';

import Contact from '../../_specifics-components/contacts/Contact';

import Swal from 'sweetalert2';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ListContacts({ title }) {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/contacts`;
  const { usersContext } = useUsersContext();
  const token = usersContext.token;
  const [selectedItems, setSelectedItems] = useState([]);

  const [page, setPage] = useState(1);
  const [itemsPage, setItemsPage] = useState(8);

  let {
    dataServer,
    isLoading = false,
    getData,
    deleteData
  } = useFetch(`${api}`);

  const filters = [
    { id: 1, name: 'email', description: 'Email' },
    { id: 2, name: 'name', description: 'Nombre' }
  ];

  function handleAdd() {
    const title = 'Adición de Contacto';
    if (token) {
      OpenModal(
        <Contact
          contact={''}
          edit={false}
          reviewList={updateList}
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

  function handleEdit(contact) {
    const title = 'Edición de Contacto';
    if (token) {
      OpenModal(
        <Contact
          contact={contact}
          edit={true}
          reviewList={updateList}
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

  const getContacts = async () => {
    const url = `${hostServer}/api/contacts`;
    await getData(url);
  };

  const updateList = async () => {
    await getContacts();
  };

  const handleDelete = async (id) => {
    const url = `${hostServer}/api/contact`;
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
          getContacts();
          await Swal.fire({
            title: 'Eliminado!',
            text: 'El comentario fue eliminado',
            icon: 'success'
          });
        };
        del();
      }
    });
  };

  const nextPage = (pagItems, pageCurrent) => {
    setItemsPage(pagItems);
    setPage(pageCurrent);
  };
  
  const handlePageChange = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
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
  }, [dataServer]);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
    <BackButton />
    <h3 className='mt-4 mb-3'>Listado de Contactos</h3>
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
                  <th scope='col'>Correo Electrónico</th>
                  <th scope='col'>Nombre</th>
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
                    selectedItems.map((contact) => {
                      return (
                        <tr key={contact.id}>
                          <td data-label='#'>{contact.id}</td>
                          <td data-label='Correo Electrónico'>{contact.email}</td>
                          <td data-label='Nombre'>{contact.name}</td>
                          <td data-label='Editar' className='td-icon'>
                            <FaRegEdit
                              onClick={() => handleEdit(contact)}
                              className='icon'
                            />
                          </td>
                          <td data-label='Eliminar' className='td-icon'>
                            <RiDeleteBin6Line
                              onClick={() => handleDelete(contact.id)}
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