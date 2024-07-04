export const deleteEnsayoUsers = ({ listUsers, id }) => {
  listUsers.map((user) => {
    const index = user.ensayos.indexOf(ensayo => ensayo.includes(id));
    delete user.ensayos[index];
    return user;
  })

  return listUsers;
}