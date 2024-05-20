export const usernameGenerator = ({ firstName, middleName, lastName, secondLastName }) => {

  const username = firstName.toLowerCase() + '.' + lastName.toLowerCase();
  const middleN = middleName.toLowerCase().replaceAll(' ', '_');
  const secondLastN = secondLastName.toLowerCase().replaceAll(' ', '_');
  let originalUsername = username;
  let i = 1;

  while (isUsernameTaken(originalUsername)) {

  }
}

const isUsernameTaken = (username) => {
  // Aquí puedes implementar la lógica para verificar si el username ya está en uso
  // Por ejemplo, puedes hacer consultas a una base de datos o verificar en una lista de usuarios existentes
  // En esta función de ejemplo, siempre devuelve false para simplificar
  return false;
}