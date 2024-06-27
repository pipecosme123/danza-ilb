import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fecha: new Date().toString(),
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
      state.asistentes = action.payload.asistentes;
    },
    resgistrarExcusas: (state, action) => {
      state.excusa = action.payload.excusa;
    },
    agragarListAsistentes: (state, action) => {
      state.listAsistentes = [].concat(action.payload.listAsistentes);
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