/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEnsayos = /* GraphQL */ `
  mutation CreateEnsayos(
    $input: CreateEnsayosInput!
    $condition: ModelEnsayosConditionInput
  ) {
    createEnsayos(input: $input, condition: $condition) {
      id
      fecha
      tipo
      asistencia
      excusas
      inasistencias
      registrador
      estadistica
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEnsayos = /* GraphQL */ `
  mutation UpdateEnsayos(
    $input: UpdateEnsayosInput!
    $condition: ModelEnsayosConditionInput
  ) {
    updateEnsayos(input: $input, condition: $condition) {
      id
      fecha
      tipo
      asistencia
      excusas
      inasistencias
      registrador
      estadistica
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEnsayos = /* GraphQL */ `
  mutation DeleteEnsayos(
    $input: DeleteEnsayosInput!
    $condition: ModelEnsayosConditionInput
  ) {
    deleteEnsayos(input: $input, condition: $condition) {
      id
      fecha
      tipo
      asistencia
      excusas
      inasistencias
      registrador
      estadistica
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      tipoId
      numId
      nombres
      apellidos
      fechaNacimiento
      genero
      direccion
      telefono
      username
      registerCognito
      sendCodeTime
      subCognito
      e_asistencia
      e_excusa
      e_inasistencia
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      tipoId
      numId
      nombres
      apellidos
      fechaNacimiento
      genero
      direccion
      telefono
      username
      registerCognito
      sendCodeTime
      subCognito
      e_asistencia
      e_excusa
      e_inasistencia
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      tipoId
      numId
      nombres
      apellidos
      fechaNacimiento
      genero
      direccion
      telefono
      username
      registerCognito
      sendCodeTime
      subCognito
      e_asistencia
      e_excusa
      e_inasistencia
      createdAt
      updatedAt
      __typename
    }
  }
`;
