import { confirmSignUp, fetchAuthSession, getCurrentUser, resendSignUpCode, signIn, signOut, signUp } from "aws-amplify/auth";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from "expo-router";
import { setCodeTime, startLoading, stopLoading } from "../reducer/system"
import { addDataUser, deleteDataUser, setIdDynamoDB, setUsername } from "../reducer/users";
import { ALERT, ROLES } from "../../constants";
import { showAlertThunk } from "./systemThunk";
import { client } from "../../app/_layout";
import { getByNumId, getUsers } from "../../src/graphql/queries";
import { dateFormatCognito, dateTimeCognitoFormat } from "../../helpers/dateFormat";
import lowerCase from "../../helpers/lowerCase";
import { updateUsers } from "../../src/graphql/mutations";
import getRoles from "../../helpers/getRoles";

export const login = ({ username, password }) => {

  const user = lowerCase(username);

  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { isSignedIn, nextStep } = await signIn({ 
        username: user, 
        password, 
        options: { 
          authFlowType: 'USER_PASSWORD_AUTH' 
        } 
      });

      console.log("login", { isSignedIn, nextStep });

      if (isSignedIn === false && nextStep.signInStep === 'CONFIRM_SIGN_UP') {

        dispatch(setUsername({ username: user }));
        await SecureStore.setItemAsync("password", password);

        router.replace({
          pathname: '/auth/comfirmSignUp',
          params: {
            resend: true
          }
        });
      }

      if (isSignedIn === true && nextStep.signInStep === 'DONE') {
        const { username, userId, signInDetails } = await getCurrentUser();
        const {payload} = (await fetchAuthSession()).tokens.idToken;
        // const {payload} = tokens;

        console.log("----------LOGEADO------------");

        dispatch(addDataUser({
          id: payload['sub'],
          username: payload['cognito:username'],
          name: payload['name'],
          lastName: payload['family_name'],
          role: getRoles(payload['cognito:groups'][0])
        }));

      }

    } catch (error) {

      const err = error.message === "User does not exist."?"El usuario y/o la contraseña no coinciden":"Hubo un error, inténtalo más tarde";
      
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: err
      }))
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }

  }
}

export const logoutUser =()=>{
  return async (dispatch)=>{
    try {
      await signOut();
    dispatch(deleteDataUser());
    } catch (error) {
      console.log(error);
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: "Hubo un error al cerrar la sesión, inténtalo nuevamente."
      }))
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

      if (items[0].registerCognito === true) {
        router.replace({
          pathname: '/auth/comfirmSignUp',
          params: {
            resend: true
          }
        });
      } else {
        router.replace({
          pathname: './signUp',
          params: { info: JSON.stringify(items[0]) }
        })
      }

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
  const { idDynamoDB, tipoId, numId, nombres, apellidos, fechaNacimiento, genero, telefono, direccion, username, correo } = data;
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

      console.log({register: { isSignUpComplete, userId, nextStep }});
      console.log({nextStep });

      await client.graphql({
        query: updateUsers,
        variables: {
          input: {
            id: idDynamoDB,
            registerCognito: true,
            sendCodeTime: new Date().toISOString(),
          }
        }
      });

      dispatch(setUsername({ username: user }));
      await AsyncStorage.setItem('idDynamoDB', idDynamoDB);
      await SecureStore.setItemAsync("password", `${numId}`);

      router.replace('/auth/comfirmSignUp');

    } catch (error) {
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: "Hubo un error, inténtalo más tarde"
      }))
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
      const { isSignUpComplete, nextStep } = await confirmSignUp({ 
        username,
        confirmationCode: code, 
      });

      console.log("confirmSignUpUser",{ isSignUpComplete, nextStep });

      if(isSignUpComplete === true){
        const password = await SecureStore.getItemAsync('password');
        
        dispatch(login({
          username,
          password
        }))
      }

    } catch (err) {
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: "Hubo un error al confirmar tu cuenta, vuelve a intentarlo más tarde."
      }))
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

// export const getTimeoutCode = () => {
//   return async (dispatch, getState) => {

//     const { idDynamoDB } = getState().users;

//     try {
//       dispatch(startLoading());
//       const { data } = await client.graphql({
//         query: getUsers,
//         id: idDynamoDB
//       });

//       const { sendCodeTime } = data.getUsers;

//       if (sendCodeTime) {
        
//       }
//       dispatch(setCodeTime({ sendCodeTime }))

//     } catch (error) {

//     } finally {
//       dispatch(stopLoading());
//     }

//   }
// }