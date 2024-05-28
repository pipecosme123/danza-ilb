import { ROLES } from "../constants";

export default getRoles = (rol) => {
  switch (rol) {
    case ROLES.SUPERADMIN:
      return ROLES.SUPERADMIN;

    case ROLES.LIDER:
      return ROLES.LIDER;

    case ROLES.INSTRUCTOR:
      return ROLES.INSTRUCTOR;

    case ROLES.REGISTRADOR:
      return ROLES.REGISTRADOR;

    case ROLES.MINISTRO:
      return ROLES.MINISTRO;

    default:
      return ROLES.DESCONECTADO;
  }
}