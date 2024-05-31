import { router } from "expo-router";
import { signUp } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { ALERT, StateSignUp, client } from "../../../constants";
import lowerCase from "../../../helpers/lowerCase";
import { updateUsers } from "../../../src/graphql/mutations";
import { startLoading, stopLoading } from "../../reducer/system";
import { showAlertThunk } from "../systemThunk";
import { dateFormatCognito } from "../../../helpers/dateFormat";

export default signUpUsers = (data) => {
  const {
    idDynamoDB,
    tipoId,
    numId,
    nombres,
    apellidos,
    fechaNacimiento,
    genero,
    telefono,
    direccion,
    username,
    correo,
  } = data;

  const user = lowerCase(username);

  return async (dispatch) => {

    dispatch(startLoading());

    try {

      const input = {
        username: user,
        password: `${numId}`,
        options: {
          userAttributes: {
            "custom:tIdentification": tipoId,
            "custom:nIdentification": `${numId}`,
            name: lowerCase(nombres),
            family_name: lowerCase(apellidos),
            birthdate: dateFormatCognito(fechaNacimiento),
            gender: genero,
            address: `${lowerCase(direccion)}`,
            phone_number: `+57${telefono}`,
            email: lowerCase(correo),
            picture: "Lorem_ipsum_dolor_sit",
            middle_name: "Lorem_ipsum_dolor_sit",
          },
        },
      }

      const { isSignUpComplete, userId, nextStep } = await signUp(input);

      console.log({ register: { isSignUpComplete, userId, nextStep } });
      console.log({ nextStep });

      await client.graphql({
        query: updateUsers,
        variables: {
          input: {
            id: idDynamoDB,
            registerCognito: StateSignUp.COMFIRM_SIGNUP,
            subCognito: userId,
            sendCodeTime: new Date().toISOString(),
            username: user
          },
        },
      });

      await AsyncStorage.setItem("idDynamoDB", idDynamoDB);
      await SecureStore.setItemAsync("password", `${numId}`);

      router.replace({
        pathname: "/auth/comfirmSignUp",
        params: {
          resend: false,
          username: user
        }
      });

    } catch (error) {
      dispatch(
        showAlertThunk({
          status: ALERT.ERROR,
          message: "Hubo un error, inténtalo más tarde",
        })
      );
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };
};