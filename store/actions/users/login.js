import { fetchAuthSession, signIn } from "aws-amplify/auth";
import * as SecureStore from "expo-secure-store";

import lowerCase from "../../../helpers/lowerCase";
import { startLoading, stopLoading } from "../../reducer/system";
import { showAlertThunk } from "../systemThunk";
import { ALERT } from "../../../constants";
import getRoles from "../../../helpers/getRoles";
import { addDataUser } from "../../reducer/users";
import { router } from "expo-router";

export default login = ({ username, password }) => {
  const user = lowerCase(username);

  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: user,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });

      console.log("login", { isSignedIn, nextStep });

      if (isSignedIn === false && nextStep.signInStep === "CONFIRM_SIGN_UP") {
        // dispatch(setUsername({ username: user }));
        await SecureStore.setItemAsync("password", password);

        router.push({
          pathname: "/auth/comfirmSignUp",
          params: {
            resend: true,
            username: user
          },
        });
      }

      if (isSignedIn === true && nextStep.signInStep === "DONE") {
        const { payload } = (await fetchAuthSession()).tokens.idToken;
        // const {payload} = tokens;

        console.log("----------LOGEADO------------");

        dispatch(
          addDataUser({
            id: payload["sub"],
            username: payload["cognito:username"],
            name: payload["name"],
            lastName: payload["family_name"],
            role: getRoles(payload["cognito:groups"][0]),
          })
        );
      }

    } catch (error) {
      const err =
        error.message === "User does not exist."
          ? "El usuario y/o la contraseña no coinciden"
          : "Hubo un error, inténtalo más tarde";

      dispatch(
        showAlertThunk({
          status: ALERT.ERROR,
          message: err,
        })
      );
      console.log(error);

    } finally {
      dispatch(stopLoading());
    }
  };
};