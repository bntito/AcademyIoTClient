const validationSchema = {
  code: [
    (value) => value.trim() === "" ? "El código del curso es requerido" : undefined,
  ],
  name: [
    (value) => value.trim() === "" ? "El nombre es requerido" : undefined,
    (value) => value.length < 2 ? "Nombre debe tener almenos 3 caracteres" : undefined,
  ],
  cost: [
    (value) => value.trim() === "" ? "El costo del curso es requerido" : undefined,
  ],
  duration: [
    (value) => String(value).trim() === "" ? "La duración del curso es requerida" : undefined,
  ],
  qualification: [
    (value) => String(value).trim() === "" ? "La calificación del curso es requerida" : undefined,
  ],
  description: [
    (value) => value.trim() === "" ? "La descripción es requerida" : undefined,
    (value) => value.length < 3 ? "La descripción debe tener almenos 3 caracteres" : undefined,
  ]
};

export default validationSchema;


// dni: [
//   (value) => value.trim() === "" ? "El número de documento es requerido" : undefined,
//   (value) => value.length < 9 ? "El DNI debe tener almenos 8 caracteres" : undefined,
//   (value) => value.match("^[0-9]+$") === null ? "Solo se admiten números" : undefined, 
// ]
// email: [
//   (value) => value.trim() === "" ? "El email es requerido" : undefined,
//   (value) => !/^\S+@\S+\S.$/.test(value) ? "Email no es válido" : undefined,
// ]