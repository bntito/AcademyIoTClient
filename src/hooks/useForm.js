import { useState } from 'react';

export const useForm = (initialForm, validationSchema, fieldsToSkipValidation = []) => {
  const [formData, setFormData] = useState(initialForm);
  const [errorsInput, setErrorsInput] = useState({});

  /* Manejo de valor input por evento (checkbox, files y value) */
  const onInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
    const fieldErrors = validateField(name, value);
    setErrorsInput((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors,
    }));
  };

  /* Validación solo cuando ocurre un cambio */
  const validateField = (name, value) => {
    if (fieldsToSkipValidation.includes(name)) return [];
    const validators = validationSchema[name];
    const errors = validators ? validators.map((validator) => validator(value, formData)).filter((error) => error !== undefined) : [];
    return errors;
  };

  /* Validación de campos para posterior envío */
  const validateForm = () => {
    let errors = {};
    let numErrors = 0;
    for (let field in formData) {
      const fieldErrors = validateField(field, formData[field]);
      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
        numErrors += fieldErrors.length;
      };
    };
    setErrorsInput(errors);
    return numErrors;
  };

  const clearForm = () => {
    setFormData(initialForm);
    setErrorsInput({});
  };

  const fillForm = (data) => {
    setFormData({
      ...formData,
      ...initialForm,
    });
  };

  return {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm,
    fillForm
  };
};