const ATTENDANCE = Object.freeze({
  EXCUSA: 'excusa',
  ASISTENCIA: 'asistencia',
  INASISTENCIA: 'inasistencia',
})

export const formatDataRequest = (data) => {

  const { fecha, tipo, listAsistentes } = data;

  const registrador = [];

  const asistencia = listAsistentes.filter(({ status }) => status === ATTENDANCE.ASISTENCIA).map(({ id, fullname }) => JSON.stringify({ id, fullname, fecha }));
  const excusas = listAsistentes.filter(({ status }) => status === ATTENDANCE.EXCUSA).map(({ id, fullname }) => JSON.stringify({ id, fullname, fecha }));
  const inasistencias = listAsistentes.filter(({ status }) => status === ATTENDANCE.INASISTENCIA).map(({ id, fullname }) => JSON.stringify({ id, fullname, fecha }));
  const dataRegistrador = JSON.stringify({
    ...data.registrador,
    action: "create",
    fecha: new Date().getTime()
  });
  const estadistica = JSON.stringify({
    asistencia: asistencia.length,
    excusas: excusas.length,
    inasistencias: inasistencias.length,
  })

  registrador.push(dataRegistrador);

  return {
    fecha,
    tipo,
    asistencia,
    excusas,
    inasistencias,
    registrador,
    estadistica,
  }
}

// export default formatDataRequest;