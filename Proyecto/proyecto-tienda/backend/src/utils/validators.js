export const validateRegister = ({
  nombre,
  correo,
  password,
}) => {
  const errors = {};

  if (!nombre?.trim()) {
    errors.nombre = "Nombre requerido";
  }

  if (!correo?.trim()) {
    errors.correo = "Correo requerido";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(correo)) {
    errors.correo = "Correo inválido";
  }

  if (!password) {
    errors.password = "Contraseña requerida";
  }

  if (password.length < 8) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres";
  }

  return errors;
};