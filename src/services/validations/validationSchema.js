const validationSchema = {
  code: [
    (value) => value.trim() === "" ? "El código del curso es requerido" : undefined
  ],
  name: [
    (value) => value.trim() === "" ? "El nombre es requerido" : undefined,
    (value) => value.length < 3 ? "Nombre debe tener almenos 3 caracteres" : undefined
  ],
  cost: [
    (value) => value.trim() === "" ? "El costo del curso es requerido" : undefined
  ],
  duration: [
    (value) => String(value).trim() === "" ? "La duración del curso es requerida" : undefined
  ],
  qualification: [
    (value) => String(value).trim() === "" ? "La calificación del curso es requerida" : undefined
  ],
  description: [
    (value) => value.trim() === "" ? "La descripción es requerida" : undefined,
    (value) => value.length < 3 ? "La descripción debe tener almenos 3 caracteres" : undefined
  ],

  dni: [
    (value) => value.trim() === "" ? "El número de documento es requerido" : undefined,
    (value) => value.length < 8 ? "El DNI debe tener almenos 8 números" : undefined,
    (value) => value.match("^[0-9]+$") === null ? "Solo se admiten números" : undefined
  ],
  lastname: [
    (value) => value.trim() === "" ? "El apeliido es requerido" : undefined,
    (value) => value.length < 3 ? "Apellido debe tener almenos 3 caracteres" : undefined
  ],
  email: [
    (value) => value.trim() === "" ? "El email es requerido" : undefined,
    (value) => !/^\S+@\S+\S.$/.test(value) ? "Email no es válido" : undefined
  ],
  phone: [
    (value) => value.trim() === "" ? "El celular es requerido" : undefined,
    (value) => value.match("^[0-9]+$") === null ? "Solo se admiten números" : undefined,
    (value) => value.length < 9 ? "El celular debe tener almenos 9 números" : undefined
  ],
  password: [
    (value) => value.trim() === "" ? "La contraseña es requerida" : undefined,
    (value) => value.length < 6 ? "La contraseña debe tener almenos 6 caracteres" : undefined
  ],
  confirmPassword: [
    (value, formData) => value.trim() === "" ? "La confirmación de la contraseña es requerida" : undefined,
    (value, formData) => value !== formData.password ? "Las contraseñas no coinciden" : undefined
  ],
  newPassword: [
    (value) => value.trim() === "" ? "La contraseña es requerida" : undefined,
    (value) => value.length < 6 ? "La contraseña debe tener almenos 6 caracteres" : undefined
  ],
  newConfirmPassword: [
    (value, formData) => value.trim() === "" ? "La confirmación de la contraseña es requerida" : undefined,
    (value, formData) => value !== formData.newPassword ? "Las contraseñas no coinciden" : undefined
  ],
  address: [
    (value) => value.trim() === "" ? "La dirección es requerida" : undefined
  ],
  message: [
    (value) => value.trim() === "" ? "El comentario es requerido" : undefined,
    (value) => value.length < 15 ? "El comentario debe tener almenos 15 caracteres" : undefined
  ]
};

export default validationSchema;