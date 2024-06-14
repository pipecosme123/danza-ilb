import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fecha: new Date().getTime(),
  listAsistentes: [],
  asistentes: [],
  excusa: [],
  inasistentes: [],
  responsable: null
}

export const ensayosSlice = createSlice({
  name: 'ensayos',
  initialState,
  reducers: {
    cambiarFecha: (state, action) => {
      state.fecha = action.payload.fecha;
    },
    agregarResponsable: (state, action) => {
      state.responsable = action.payload.responsable;
    },
    registrarAsistentes: (state, action) => {
      state.asistentes.push(action.payload.asistentes);
    },
    resgistrarExcusas: (state, action) => {
      state.inasistentes = action.payload.inasistentes;
      state.excusa = action.payload.excusa;
    },
    agragarListAsistentes: (state, action) => {
      state.listAsistentes = action.payload.listAsistentes;
    },
    limpiarRegistroEnsayos: (state) => {
      state.fecha = new Date().getTime();
      state.asistentes = [];
      state.excusa = [];
      state.inasistentes = [];
      state.responsable = null;
    },
    limpiarListAsistentes: (state) => {
      state.listAsistentes = [];
    },
  }
})

export const {
  cambiarFecha,
  agregarResponsable,
  registrarAsistentes,
  resgistrarExcusas,
  limpiarRegistroEnsayos,
  agragarListAsistentes,
  limpiarListAsistentes
} = ensayosSlice.actions;

export default ensayosSlice.reducer