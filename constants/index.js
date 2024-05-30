import Constants from 'expo-constants';
import { generateClient } from 'aws-amplify/api';

export const statusBarHeight = Constants.statusBarHeight;

export const ROLES = {
  SUPERADMIN: 'superusuario',
  LIDER: 'lider',
  INSTRUCTOR: 'instructor',
  REGISTRADOR: 'registrador',
  MINISTRO: 'ministro',
  DESCONECTADO: 'desconectado'
}

export const ALERT = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
}

export const client = generateClient();