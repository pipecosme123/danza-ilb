import { post } from "aws-amplify/api";
import { useSelector } from "react-redux";
import { ALERT } from "../../../constants";
import { startLoading, stopLoading } from "../../reducer/system"
import { showAlertThunk } from "../systemThunk";

export default registrarEnsayo = (data) => {
  return async (dispatch) => {

    dispatch(startLoading());
    try {

      const restOperation = post({
        apiName: 'apidanzailb',
        path: '/ensayos',
        options: {
          body: { data }
        }
      });

      // console.log({ data. });

      // const body = await restOperation.response;
      // console.log(body);
      const { body } = await restOperation.response;
      const response = await body.json();

      console.log('POST call succeeded');
      console.log(response);

    } catch (error) {
      console.log({ error });
      dispatch(showAlertThunk({
        status: ALERT.ERROR,
        message: "Hubo un error, intentalo más tarde"
      }))
    } finally {
      dispatch(stopLoading())
    }
  }
}