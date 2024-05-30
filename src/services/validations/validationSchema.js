const validationSchema = {
  code: [
    (value) => value.trim() === "" ? "El código del curso es obligatorio" : undefined
  ],
  name: [
    (value) => value.trim() === "" ? "El nombre es obligatorio" : undefined,
    (value) => value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : undefined
  ],
  cost: [
    (value) => value.trim() === "" ? "El costo del curso es obligatorio" : undefined
  ],
  duration: [
    (value) => String(value).trim() === "" ? "La duración del curso es obligatoria" : undefined
  ],
  qualification: [
    (value) => String(value).trim() === "" ? "La calificación del curso es obligatoria" : undefined
  ],
  description: [
    (value) => value.trim() === "" ? "La descripción es obligatoria" : undefined,
    (value) => value.length < 3 ? "La descripción debe tener al menos 3 caracteres" : undefined
  ],
  dni: [
    (value) => value.trim() === "" ? "El número de documento es obligatorio" : undefined,
    (value) => !/^\d{1,3}(\.\d{3}){2}-\d{1}$/.test(value) ? "El formato del DNI debe ser X.XXX.XXX-X" : undefined
  ],  
  lastname: [
    (value) => value.trim() === "" ? "El apellido es obligatorio" : undefined,
    (value) => value.length < 3 ? "El apellido debe tener al menos 3 caracteres" : undefined
  ],
  email: [
    (value) => value.trim() === "" ? "El correo electrónico es obligatorio" : undefined,
    (value) => !/^\S+@\S+\S.$/.test(value) ? "El correo electrónico no es válido" : undefined
  ],
  phone: [
    (value) => value.trim() === "" ? "El número de teléfono es obligatorio" : undefined,
    (value) => value.length < 9 ? "El número de teléfono debe tener al menos 9 dígitos" : undefined,
    (value) => !/^0\d{2}-\d{3}-\d{3}$/.test(value) ? "El formato del número de teléfono debe ser 0XX-XXX-XXX" : undefined
  ],
  password: [
    (value) => value.trim() === "" ? "La contraseña es obligatoria" : undefined,
    (value) => value.length < 6 ? "La contraseña debe tener al menos 6 caracteres" : undefined
  ],
  confirmPassword: [
    (value, formData) => value.trim() === "" ? "La confirmación de la contraseña es obligatoria" : undefined,
    (value, formData) => value !== formData.password ? "Las contraseñas no coinciden" : undefined
  ],
  newPassword: [
    (value) => value.trim() === "" ? "La nueva contraseña es obligatoria" : undefined,
    (value) => value.length < 6 ? "La nueva contraseña debe tener al menos 6 caracteres" : undefined
  ],
  newConfirmPassword: [
    (value, formData) => value.trim() === "" ? "La confirmación de la nueva contraseña es obligatoria" : undefined,
    (value, formData) => value !== formData.newPassword ? "Las nuevas contraseñas no coinciden" : undefined
  ],
  address: [
    (value) => value.trim() === "" ? "La dirección es obligatoria" : undefined
  ],
  message: [
    (value) => value.trim() === "" ? "El comentario es obligatorio" : undefined,
    (value) => value.length < 15 ? "El comentario debe tener al menos 15 caracteres" : undefined
  ]
};

export default validationSchema;