import Constants from 'expo-constants';
import { generateClient } from 'aws-amplify/api';

export const statusBarHeight = Constants.statusBarHeight;
export const marginTopShort = "80px";

export const ROLES = Object.freeze({
  SUPERADMIN: 'superusuario',
  LIDER: 'lider',
  INSTRUCTOR: 'instructor',
  REGISTRADOR: 'registrador',
  MINISTRO: 'ministro',
  DESCONECTADO: 'desconectado'
});

export const ALERT = Object.freeze({
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
});

export const StateSignUp = Object.freeze({
  NO_REGISTER: "NO_REGISTER",
  COMFIRM_SIGNUP: "COMFIRM_SIGNUP",
  DONE: "DONE",
});

export const ATTENDANCE = Object.freeze({
  EXCUSA: 'excusa',
  INASISTENCIA: 'inasistencia',
  ASISTENCIA: 'asistencia',
  CHANGEFALSE: "changefalse",
  FALSE: false
})

export const TIPOENSAYO = Object.freeze({
  ACTIVOS: "ACTIVOS",
  FUTUROS: "FUTUROS",
  ASPIRANTES: "ASPIRANTES",
  INFANTIL_FUTUROS: "INFANTIL_FUTUROS",
  INFANTIL_ASPIRANTE: "INFANTIL_ASPIRANTE",
  INFANTIL_BEBES: "INFANTIL_BEBES",
  DIADEMAS_HONRA: "DIADEMAS_HONRA",
})


export const client = generateClient();