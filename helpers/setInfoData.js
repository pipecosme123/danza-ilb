export default setDataUser = (info) => {
  const arrayData = [];
  for (let i = 0; i < info.length; i++) {
    arrayData.push({
      id: info[i].id,
      fullName: `${info[i].nombres} ${info[i].apellidos}`,
      status: false
    })
  }
  return arrayData;
}