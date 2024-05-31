import { router } from "expo-router";
import { StateSignUp, client } from "../../../constants";
import { getByNumId } from "../../../src/graphql/queries";
import { startLoading, stopLoading } from "../../reducer/system";
import { showAlertThunk } from "../systemThunk";

export default getDataToSignUp = ({ identificacion }) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());

      const response = await client.graphql({
        query: getByNumId,
        variables: { numId: identificacion },
      });

      const items = response.data.getByNumId.items;

      if (items.length === 0) {
        throw new Error(
          "El número de cédula digitado no se encuentra registrado en la base de datos"
        );
      }

      const data = items[0];

      if (data.registerCognito === StateSignUp.COMFIRM_SIGNUP) {
        router.replace({
          pathname: "/auth/comfirmSignUp",
          params: {
            resend: true,
            username: data.username
          },
        });
      } else {
        router.push({
          pathname: "./signUp",
          params: { info: JSON.stringify(data) },
        });
      }

    } catch (error) {
      dispatch(
        showAlertThunk({
          status: ALERT.ERROR,
          message: error.message || "Hubo un error, inténtalo más tarde",
        })
      );

    } finally {
      dispatch(stopLoading());
    }
  };
};