const ATTENDANCE = Object.freeze({
  EXCUSA: 'excusa',
  ASISTENCIA: 'asistencia',
  INASISTENCIA: 'inasistencia',
})

export const formatDataRequest = (data) => {

  const { fecha, tipo, listAsistentes } = data;

  const asistencia = listAsistentes.filter(({ status }) => status === ATTENDANCE.ASISTENCIA).map(({ id, fullname }) => JSON.stringify({ id, fullname }));
  const excusas = listAsistentes.filter(({ status }) => status === ATTENDANCE.EXCUSA).map(({ id, fullname }) => JSON.stringify({ id, fullname }));
  const inasistencias = listAsistentes.filter(({ status }) => status === ATTENDANCE.INASISTENCIA).map(({ id, fullname }) => JSON.stringify({ id, fullname }));
  const registrador = JSON.stringify(data.registrador);
  const estadistica = JSON.stringify({
    asistencia: asistencia.length,
    excusas: excusas.length,
    inasistencias: inasistencias.length,
  })

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