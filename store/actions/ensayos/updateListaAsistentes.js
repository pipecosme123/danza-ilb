import { ATTENDANCE } from "../../../constants";
import { agragarListAsistentes } from "../../reducer/ensayos";

export default updateListaAsistentes = ({ listAsistentes, childRefs, type }) => {
  return async (dispatch) => {

    const newStatusData = [].concat(listAsistentes).map((item, index) => {
      const childState = childRefs.current[index]?.getChildState();
      if (childState) {
        if (childState.status === true && item.status === false) {
          return { ...item, status: type };
        }

        if (childState.status === false && item.status === type) {
          return { ...item, status: ATTENDANCE.FALSE };
        }
      }
      return item;
    });
    await dispatch(agragarListAsistentes({ listAsistentes: newStatusData }));
  }
}