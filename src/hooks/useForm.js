import { useState } from 'react';

export const useForm = (initialForm, validationSchema) => {
  const [formData, setFormData] = useState(initialForm);
  const [errorsInput, setErrorsInput] = useState({});

  const onInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value
    });
    setErrorsInput({
      ...errorsInput,
      [name]: []
    });
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in validationSchema) {
      const validationFn = validationSchema[key];
      if (formData[key] != undefined) {
        let value = formData[key];
        const fieldErrors = validationFn
          .map((fn) => fn(value))
          .filter((error) => error !== undefined);
        if (fieldErrors.length > 0) {
          newErrors[key] = fieldErrors;
        }
      }
    }
    setErrorsInput(newErrors);
    return Object.keys(newErrors).length;
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
}