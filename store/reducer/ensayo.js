import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fecha: new Date(),
  asistentes: [],
  excusa: [],
  inasistentes: [],
  responsable: null
}

export const ensayoSlice = createSlice({
  name: 'ensayo',
  initialState,
  reducers: {
    cambiarFecha: ({ fecha }, { payload }) => {
      fecha = payload.fecha;
    },
    agregarResponsable: ({ responsable }, { payload }) => {
      responsable = payload.responsable;
    },
    registrarAsistentes: ({ asistentes, inasistentes }, { payload }) => {
      asistentes = payload.asistentes;
      inasistentes = payload.inasistentes;
    },
    resgistrarExcusas: ({ inasistentes, excusa }, { payload }) => {
      inasistentes = payload.inasistentes;
      excusa = payload.excusa;
    },
    limpiarRegistroEnsayo: (state) => {
      state = initialState;
    }
  }
})

export const { cambiarFecha, agregarResponsable, registrarAsistentes, resgistrarExcusas, limpiarRegistroEnsayo } = ensayoSlice.actions;

export default ensayoSlice.reducer