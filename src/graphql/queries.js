/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
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
export const listUserss = /* GraphQL */ `
  query ListUserss(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getByNumId = /* GraphQL */ `
  query GetByNumId($numId: String!) {
    getByNumId(numId: $numId) {
      items {
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
      nextToken
      __typename
    }
  }
`;
