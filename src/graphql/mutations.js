/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUsersData = /* GraphQL */ `
  mutation CreateUsersData(
    $input: CreateUsersDataInput!
    $condition: ModelUsersDataConditionInput
  ) {
    createUsersData(input: $input, condition: $condition) {
      id
      tipoId
      numId
      nombres
      apellidos
      fechaNacimiento
      genero
      direccion
      telefono
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUsersData = /* GraphQL */ `
  mutation UpdateUsersData(
    $input: UpdateUsersDataInput!
    $condition: ModelUsersDataConditionInput
  ) {
    updateUsersData(input: $input, condition: $condition) {
      id
      tipoId
      numId
      nombres
      apellidos
      fechaNacimiento
      genero
      direccion
      telefono
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUsersData = /* GraphQL */ `
  mutation DeleteUsersData(
    $input: DeleteUsersDataInput!
    $condition: ModelUsersDataConditionInput
  ) {
    deleteUsersData(input: $input, condition: $condition) {
      id
      tipoId
      numId
      nombres
      apellidos
      fechaNacimiento
      genero
      direccion
      telefono
      createdAt
      updatedAt
      __typename
    }
  }
`;
