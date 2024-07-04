export const listUserss = /* GraphQL */ `
  query ListUserss(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ensayos
      }
    }
  }
`;

export const getEnsayos = /* GraphQL */ `
  query GetEnsayos($id: ID!) {
    getEnsayos(id: $id) {
      id
      registrador
    }
  }
`;