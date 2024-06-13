import React, { useState, useEffect } from 'react';

import './searcher.css';

const Searcher = ({ filters, registers, onChange }) => {
  const [field, setField] = useState('');
  const [filter, setFilter] = useState('');

  if (!registers) {
    return;
  }

  const handleFieldChange = (e) => {
    setField(e.target.value);
    setFilter('');
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter === '') {
      onChange(registers);
      return;
    }
    ejectFilter();
  };

  const ejectFilter = () => {
    const resultOfFilter = registers.filter((register) => {
      if (register[field]) {
        const valueOfFilter = filter.toLowerCase();
        return register[field].toLowerCase().includes(valueOfFilter);
      }
    });
    onChange(resultOfFilter);
  };

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