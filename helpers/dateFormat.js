export const dateFormat = (fecha) => {
  const newDate = new Date(fecha);
  const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const dayWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  return `${dayWeek[newDate.getDay()]}, ${newDate.getDate()} de ${month[newDate.getMonth()]} ${newDate.getFullYear()}`;
}

export const birthdayFormat = (fecha) => {
  const newDate = new Date(fecha);
  const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return `${newDate.getDate()} / ${month[newDate.getMonth()]} / ${newDate.getFullYear()}`;
}

export const dateFormatCognito = (fecha) => {
  const newDate = new Date(fecha);
  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
}

export const dateTimeCognitoFormat = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.000Z`;
}