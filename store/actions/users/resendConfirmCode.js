import { resendSignUpCode } from "aws-amplify/auth";
import { startLoading, stopLoading } from "../../reducer/system";
import { showAlertThunk } from "../systemThunk";
import { ALERT } from "../../../constants";

export default resendConfirmCode = ({ username }) => {
  return async (dispatch) => {

    console.log({ username });
    dispatch(startLoading());

    try {
      await resendSignUpCode({ username });
      dispatch(
        showAlertThunk({
          status: ALERT.SUCCESS,
          message:
            "El código de verificación se ha enviado nuevamente a su correo electrónico",
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(
        showAlertThunk({
          status: ALERT.ERROR,
          message: "Hubo un error al enviar el código de verificación",
        })
      );

    } finally {
      dispatch(stopLoading());
    }
  };
};