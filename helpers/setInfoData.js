import { ATTENDANCE } from "../constants";

export default setDataUser = (info) => {
  const arrayData = [];
  for (let i = 0; i < info.length; i++) {

    const apellido = info[i].apellidos.split(' ')[0];

    arrayData.push({
      id: info[i].id,
      fullName: `${info[i].nombres} ${apellido}`,
      status: ATTENDANCE.FALSE
    })
  }
  return arrayData;
}