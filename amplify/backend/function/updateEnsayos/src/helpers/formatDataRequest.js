const ATTENDANCE = Object.freeze({
  EXCUSA: 'excusa',
  ASISTENCIA: 'asistencia',
  INASISTENCIA: 'inasistencia',
})

export const formatDataRequest = (data) => {

  const { id, fecha, tipo, listAsistentes, dataRegistrador } = data;

  // const registrador = [];

  const asistencia = listAsistentes.filter(({ status }) => status === ATTENDANCE.ASISTENCIA).map(({ id, fullname }) => JSON.stringify({ id, fullname, fecha }));
  const excusas = listAsistentes.filter(({ status }) => status === ATTENDANCE.EXCUSA).map(({ id, fullname }) => JSON.stringify({ id, fullname, fecha }));
  const inasistencias = listAsistentes.filter(({ status }) => status === ATTENDANCE.INASISTENCIA).map(({ id, fullname }) => JSON.stringify({ id, fullname, fecha }));
  const dataRegistador = JSON.stringify({
    ...data.registrador,
    action: "update",
    fecha: new Date().getTime()
  });
  const estadistica = JSON.stringify({
    asistencia: asistencia.length,
    excusas: excusas.length,
    inasistencias: inasistencias.length,
  })

  dataRegistrador.push(dataRegistador);

  return {
    id,
    fecha,
    tipo,
    asistencia,
    excusas,
    inasistencias,
    registrador: dataRegistrador,
    estadistica,
  }
}

// export default formatDataRequest;