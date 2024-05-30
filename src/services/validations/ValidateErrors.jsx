import React from 'react';

function ValidateErrors({ errors }) {
  return (
    <>
      {
        errors && errors.map((error, index) => (
          <p
            key={index}
            className='error'
          >{error}
          </p>
        ))
      }
    </>
  );
};

export default ValidateErrors;