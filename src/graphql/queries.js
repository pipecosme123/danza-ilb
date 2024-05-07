/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsersData = /* GraphQL */ `
  query GetUsersData($id: ID!) {
    getUsersData(id: $id) {
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
export const listUsersDatas = /* GraphQL */ `
  query ListUsersDatas(
    $filter: ModelUsersDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const userNumId = /* GraphQL */ `
  query UserNumId(
    $numId: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userNumId(
      numId: $numId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
