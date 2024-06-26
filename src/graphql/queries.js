/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEnsayos = /* GraphQL */ `
  query GetEnsayos($id: ID!) {
    getEnsayos(id: $id) {
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
export const listEnsayoss = /* GraphQL */ `
  query ListEnsayoss(
    $filter: ModelEnsayosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnsayoss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
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
      username
      registerCognito
      sendCodeTime
      subCognito
      ensayos
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
        username
        registerCognito
        sendCodeTime
        subCognito
        ensayos
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
  query GetByNumId(
    $numId: String
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getByNumId(
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
        username
        registerCognito
        sendCodeTime
        subCognito
        ensayos
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
