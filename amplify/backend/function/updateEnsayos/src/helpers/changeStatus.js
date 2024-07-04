const ATTENDANCE = Object.freeze({
  FALSE: false,
  INASISTENCIA: 'inasistencia',
})

export const changeStatus = (listAsistentes) => {
  const registro = listAsistentes.map(asistente => {
    if (asistente.status === ATTENDANCE.FALSE) {
      return { ...asistente, status: ATTENDANCE.INASISTENCIA };
    }
    return asistente
  })

  return registro;
}