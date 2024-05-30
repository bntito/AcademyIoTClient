import { useState } from 'react';

export const useForm = (initialForm, validationSchema, fieldsToSkipValidation = []) => {
  const [formData, setFormData] = useState(initialForm);
  const [errorsInput, setErrorsInput] = useState({});

  const validateField = (name, value) => {
    if (fieldsToSkipValidation.includes(name)) return [];
    const validators = validationSchema[name];
    const errors = validators ? validators.map((validator) => validator(value, formData)).filter((error) => error !== undefined) : [];
    return errors;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const fieldErrors = validateField(name, value);
    setErrorsInput((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors,
    }));
  };

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

  return {
    formData,
    onInputChange,
    validateForm,
    errorsInput,
    clearForm,
  };
};