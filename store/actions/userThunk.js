import axios from "axios";
import { startLoading, stopLoading } from "../reducer/system"
import { addDataUser } from "../reducer/userSlice";
import { ROLES } from "../../constants/roles";
import { router } from "expo-router";
import { ALERT } from "../../constants/alerts";
import { showAlertThunk } from "./systemThunk";
import { confirmResetPassword, resetPassword, signIn } from "aws-amplify/auth";
import { client } from "../../app/_layout";
import { userNumId } from "../../src/graphql/queries";

export const login = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(startLoading());
    console.log({ username, password });
    try {
      const response = await signIn({ username, password, options: { authFlowType: 'USER_PASSWORD_AUTH' } });
      console.log(response);
    } catch (error) {
      console.log('error signing in', error);
    }

    // if (user.toLowerCase() === 'sadmin' && password.toLowerCase() === 'sadmin') {
    //   dispatch(addDataUser({
    //     id: '0ae25324-3474-42ca-bba2-a90ee474fc22',
    //     identification: '1143997339',
    //     firstName: 'Daniel Felipe',
    //     lastName: 'Cosme Vásquez',
    //     role: ROLES.SUPERADMIN
    //   }))

    // router.replace('/(protected)');
    // } else {
    //   dispatch(showAlertThunk({
    //     status: ALERT.ERROR,
    //     message: "El usuario y/o la contraseña no son correctas"
    //   }))
    // }

  }
}

export const getDataToSignUp = ({ identificacion }) => {
  return async (dispatch) => {

    try {
      dispatch(startLoading());
      const response = await client.graphql({
        query: userNumId,
        variables: { numId: identificacion }
      });

      const items = response.data.userNumId.items;

      if (items.length === 0) {
        dispatch(showAlertThunk({
          status: ALERT.ERROR,
          message: "El número de cédula no se encuentra registrado"
        }))
      } else {
        console.log(items);
      }

    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }

    new Promise(async (resolve, reject) => {





    })
      .then((data) => {
        console.log(data);
        // router.replace('/auth/signUp');
      })
      .catch(() => {

      })
      .finally(() => {
      })
  }
}

// export const sendConfirmationCode = ({ username }) => {
//   return async (dispatch) => {
//     try {
//       const output = await resetPassword({ username });
//       handleResetPasswordNextSteps(output);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

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