import { useState, useEffect } from 'react';

import { ImPrevious2 } from 'react-icons/im';
import { ImNext2 } from 'react-icons/im';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { TbPlayerTrackPrevFilled } from 'react-icons/tb';

import './pagination.css';

// Componente funcional para la paginación
const Pagination = ({ items, page, pagItems, nextPage, onPageChange }) => {
  const [pageSize, setPageSize] = useState(pagItems);
  const [currentPage, setCurrentPage] = useState(page);
  let firstPage = 1;
  let btnSelected = null;

  // Array para almacenar los elementos de la lista de páginas
  const listItems = [];

  // Evita renderizar si no hay datos disponibles
  if (!items) {
    return null;
  }

  // Calcular el número total de páginas
  const totalPages = Math.ceil(items.length / pageSize);

  // Función para cambiar el tamaño de la página
  const onPageSizeChange = (newPageSize) => {
    const startIndex = (currentPage - 1) * newPageSize;
    const endIndex = startIndex + newPageSize;
    const currentItems = items.slice(startIndex, endIndex);
    setPageSize(newPageSize);
    nextPage(newPageSize, currentPage);
    onPageChange(currentItems);
  };

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > totalPages) {
      newPage = totalPages;
    }
    if (newPage < 1) {
      newPage = 1;
    }
    // Quitar la clase 'active' del botón seleccionado anteriormente
    if (btnSelected) {
      btnSelected.classList.remove('active');
    }
    // Agregar la clase 'active' al botón de la nueva página seleccionada
    const btnNew = document.getElementById(`btn${newPage}`);
    if (btnNew) {
      btnNew.classList.add('active');
      btnSelected = btnNew;
    }
    // Actualiza la página actual y los elementos
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = items ? items.slice(startIndex, endIndex) : 1;
    nextPage(pageSize, newPage);
    onPageChange(currentItems);
  };

  // Calcular los índices de inicio y fin para las páginas que se mostrarán
  let start = 1;
  let end = currentPage + 3;
  if (end >= totalPages) {
    end = totalPages;
  }
  start = end - 4;
  if (start < 0   ) {
    start = 0;
  }
  
  // Generar los elementos de la lista de páginas
  for (let index = start; index < end; index++) {
    listItems.push(
      <li
        id={`btn${index + 1}`}
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={index + 1 === currentPage ? 'active' : ''}
      >
        {index + 1}
      </li>
    );
  }

  // Establece la página en 1 al cargar nuevos datos
  useEffect(() => {
    items && handlePageChange(1);
  }, [items]);

  // Inicializa el tamaño de la página al montar el componente
  useEffect(() => {
    onPageSizeChange(pageSize);
  }, []);

  return (
    <>
      <section className='pagination'>
        <div className='page-size'>
          <label className='reg-for-pag' htmlFor='pageSize'>Registros por página</label>
          <select
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            value={pageSize}
            className='w-25 mx-2 select-pages'
          >
            <option value={8}>8</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <ul className='pags'>{listItems}</ul>
        <div className='btns-pag'>
          <a
            onClick={() => handlePageChange(firstPage)}
            disabled={firstPage}
            className='btn-pag'
          >
            <ImPrevious2 />
          </a>
          <a
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='btn-pag'
          >
            <TbPlayerTrackPrevFilled />
          </a>
          <a
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='btn-pag'
          >
            <TbPlayerTrackNextFilled />
          </a>
          <a
            onClick={() => handlePageChange(totalPages)}
            disabled={totalPages}
            className='btn-pag'
          >
            <ImNext2 />
          </a>
        </div>
        <div className='pag-view'>
          <span>
            Página {currentPage} de {totalPages}
          </span>
        </div>
      </section>
    </>
  );
}

export default Pagination;