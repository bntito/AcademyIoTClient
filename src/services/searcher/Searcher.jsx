import React, { useState, useEffect } from 'react';

import './searcher.css';

const Searcher = ({ filters, registers, onChange }) => {
  // Estado para el campo seleccionado en el filtro
  const [field, setField] = useState('');
  // Estado para el valor ingresado en el campo de búsqueda
  const [filter, setFilter] = useState('');

  // Manejar el caso cuando no hay registros
  if (!registers) {
    return;
  }

  // Manejar el cambio en el campo seleccionado en el filtro
  const handleFieldChange = (e) => {
    setField(e.target.value);
    setFilter('');
  };

  // Manejar el cambio en el valor ingresado en el campo de búsqueda
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Manejar la presentación del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    // Si no se ha seleccionado ningún filtro, se muestra todos los registros
    if (filter === '') {
      onChange(registers);
      return;
    }
    ejectFilter();
  };

  // Ejecutar el filtro seleccionado
  const ejectFilter = () => {
    const resultOfFilter = registers.filter((register) => {
      if (register[field]) {
        const valueOfFilter = filter.toLowerCase();
        return register[field].toLowerCase().includes(valueOfFilter);
      }
    });
    onChange(resultOfFilter);
  };

  // Establecer el campo por defecto del filtro
  useEffect(() => {
    if (filters[0].name) {
      setField(filters[0].name);
    }
  }, []);

  return (
    <>
      <div className='form-group m-auto'>
        <form className='form-search'>
          <div className='input-search'>
            <label htmlFor='field' className='field-searcher'>Filtros:</label>
            <select
              name='field'
              value={field}
              onChange={handleFieldChange}
              className='filter-searcher'
            >
              {
                filters.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.description}
                  </option>
                ))
              }
            </select>
            <input 
              type='text'
              name='filter'
              value={filter}
              onChange={handleFilterChange}
              className='form-control text-search'
            />
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='btn-searcher'
          >
            Búscar
          </button>
        </form>
      </div>
    </>
  );
}

export default Searcher;