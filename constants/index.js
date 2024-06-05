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

export const ATTENDANCE = {
  EXCUSA: 'excusa',
  INASISTENCIA: 'inasistentes',
  ASISTENCIA: 'asistencia'
}

export const client = generateClient();