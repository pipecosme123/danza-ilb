import { signOut } from "aws-amplify/auth";
import { deleteDataUser } from "../../reducer/users";
import { showAlertThunk } from "../systemThunk";
import { startLoading, stopLoading } from "../../reducer/system";

export default logoutUser = () => {
  return async (dispatch) => {

    dispatch(startLoading());

    try {
      await signOut();
      dispatch(deleteDataUser());

    } catch (error) {
      console.log(error);
      dispatch(
        showAlertThunk({
          status: ALERT.ERROR,
          message: "Hubo un error al cerrar la sesión, inténtalo nuevamente.",
        })
      );

    } finally {
      dispatch(stopLoading());
    }

  };
};