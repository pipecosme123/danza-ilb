import { client } from "../../../constants";
import setInfoData from "../../../helpers/setInfoData";
import { listUsersEnsayo } from "../../../src/graphql/queries";
import { agragarListAsistentes } from "../../reducer/ensayos";
import { startLoading, stopLoading } from "../../reducer/system";

export default getDataUsersEnsayos = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await client.graphql({
        query: listUsersEnsayo
      });

      const listAsistentes = setInfoData(data.listUserss.items);
      dispatch(agragarListAsistentes({ listAsistentes }))

    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  }
}