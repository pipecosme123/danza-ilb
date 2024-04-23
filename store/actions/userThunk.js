import axios from "axios";
import { startLoading } from "../reducer/system"
import { addDataUser } from "../reducer/userSlice";
import { ROLES } from "../../constants/roles";
import { router } from "expo-router";
import { ALERT } from "../../constants/alerts";
import { showAlertThunk } from "./systemThunk";

export const login = ({ user, password }) => {
  return (dispatch) => {
    dispatch(startLoading());

    if (user.toLowerCase() === 'sadmin' && password.toLowerCase() === 'sadmin') {
      dispatch(addDataUser({
        id: '0ae25324-3474-42ca-bba2-a90ee474fc22',
        identification: '1143997339',
        firstName: 'Daniel Felipe',
        lastName: 'Cosme Vásquez',
        role: ROLES.SUPERADMIN
      }))

      router.replace('/(protected)');
    } else {
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: "El usuario y/o la contraseña no son correctas"
      }))
    }

  }
}