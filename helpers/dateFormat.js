export const dateFormat = (fecha) => {
  const newDate = new Date(fecha);
  const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const dayWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  return `${dayWeek[newDate.getDay()]}, ${newDate.getDate()} de ${month[newDate.getMonth()]} ${newDate.getFullYear()}`;
}