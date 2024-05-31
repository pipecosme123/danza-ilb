import { confirmSignUp } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { startLoading, stopLoading } from "../../reducer/system";
import { ALERT, StateSignUp, client } from "../../../constants";
import { updateUsers } from "../../../src/graphql/mutations";
import login from "./login";
import { showAlertThunk } from "../systemThunk";

export default confirmSignUpUser = ({ code, username }) => {
  return async (dispatch) => {

    dispatch(startLoading());

    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode: code,
      });

      console.log("confirmSignUpUser", { isSignUpComplete, nextStep });

      if (isSignUpComplete === true) {
        const password = await SecureStore.getItemAsync("password");
        const idDynamoDB = await AsyncStorage.getItem("idDynamoDB");

        await client.graphql({
          query: updateUsers,
          variables: {
            input: {
              id: idDynamoDB,
              registerCognito: StateSignUp.DONE,
            },
          },
        });

        await SecureStore.deleteItemAsync('password');
        await AsyncStorage.removeItem('idDynamoDB');

        dispatch(
          login({
            username,
            password,
          })
        );
      }

    } catch (err) {
      dispatch(
        showAlertThunk({
          status: ALERT.ERROR,
          message:
            "Hubo un error al confirmar tu cuenta, vuelve a intentarlo más tarde.",
        })
      );
      console.log(err);
    } finally {
      dispatch(stopLoading());
    }
  };
};
