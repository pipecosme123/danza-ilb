import axios from "axios";
import { startLoading, stopLoading } from "../reducer/system"
import { addDataUser, setUsername } from "../reducer/users";
import { ALERT, ROLES } from "../../constants";
import { router } from "expo-router";
import { showAlertThunk } from "./systemThunk";
import { confirmSignIn, confirmSignUp, resendSignUpCode, signIn, signUp } from "aws-amplify/auth";
import { client } from "../../app/_layout";
import { getByNumId } from "../../src/graphql/queries";
import { dateFormatCognito } from "../../helpers/dateFormat";
import lowerCase from "../../helpers/lowerCase";

export const login = ({ username, password }) => {

  const user = lowerCase(username);

  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { isSignedIn, nextStep } = await signIn({ username: user, password, options: { authFlowType: 'USER_PASSWORD_AUTH' } });

      console.log({ isSignedIn, nextStep });

      if (isSignedIn === false && nextStep.signInStep === 'CONFIRM_SIGN_UP') {

        dispatch(setUsername({ username: user }));

        router.replace({
          pathname: '/auth/comfirmSignUp',
          params: {
            resend: true
          }
        });
      }

    } catch (error) {
      console.log('error signing in', error);
    } finally {
      dispatch(stopLoading());
    }

  }
}

export const getDataToSignUp = ({ identificacion }) => {
  return async (dispatch) => {

    try {
      dispatch(startLoading());

      const response = await client.graphql({
        query: getByNumId,
        variables: { numId: identificacion }
      });

      const items = response.data.getByNumId.items;

      if (items.length === 0) {
        throw new Error('El número de cédula digitado no se encuentra registrado en la base de datos')
      }

      router.replace({
        pathname: './signUp',
        params: { info: JSON.stringify(items[0]) }
      })

    } catch (error) {
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: error.message || "Hubo un error, inténtalo más tarde"
      }))
      console.log(error);

    } finally {
      dispatch(stopLoading());
    }

  }
}

export const signUpUsers = (data) => {
  const { tipoId, numId, nombres, apellidos, fechaNacimiento, genero, telefono, direccion, username, correo } = data;
  const user = lowerCase(username);

  return async (dispatch) => {

    dispatch(startLoading());
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: user,
        password: `${numId}`,
        options: {
          userAttributes: {
            "custom:tIdentification": tipoId,
            "custom:nIdentification": `${numId}`,
            name: lowerCase(nombres),
            family_name: lowerCase(apellidos),
            birthdate: `${dateFormatCognito(fechaNacimiento)}`,
            gender: genero,
            address: `${lowerCase(direccion)}`,
            phone_number: `+57${telefono}`,
            email: lowerCase(correo),
            picture: 'Lorem_ipsum_dolor_sit',
            middle_name: 'Lorem_ipsum_dolor_sit',
          },
        }
      });
      // CONFIRM_SIGN_UP
      console.log({ isSignUpComplete, userId, nextStep });
      dispatch(setUsername({ username: user }));
      router.replace('/auth/comfirmSignUp');
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }
}

export const confirmSignUpUser = ({ code }) => {
  return async (dispatch, getState) => {

    const { username } = getState().users;

    dispatch(startLoading());
    try {
      const output = await confirmSignUp({ confirmationCode: code, username });
      console.log({ output });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(stopLoading());
    }
  }
}

export const resendCode = () => {
  return async (dispatch, getState) => {

    const { username } = getState().users;
    console.log({ username });
    dispatch(startLoading());

    try {
      await resendSignUpCode({ username });
      dispatch(showAlertThunk({
        status: ALERT.SUCCESS,
        message: "El código de verificación se ha enviado nuevamente a su correo electrónico"
      }))
    } catch (error) {
      console.log(error);
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: "Hubo un error al enviar el código de verificación"
      }))
      // dispatch(showAlertThunk({
      //   status: ALERT.ERROR,
      //   message: "Intente nuevamente más tarde"
      // }))
    } finally {
      dispatch(stopLoading());
    }
  }
}

// const handleResetPasswordNextSteps = (output) => {
//   const { nextStep } = output;
//   console.log(nextStep);
//   switch (nextStep.resetPasswordStep) {
//     case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
//       const codeDeliveryDetails = nextStep.codeDeliveryDetails;
//       console.log(
//         `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
//       );
//       // Collect the confirmation code from the user and pass to confirmResetPassword.
//       break;
//     case 'DONE':
//       console.log('Successfully reset password.');
//       break;
//   }
// }

// export const confirmPassword = ({ username, confirmationCode, newPassword }) => {
//   return async (dispatch) => {
//     try {
//       const respo = await confirmResetPassword({ username, confirmationCode, newPassword });
//       console.log(respo);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }