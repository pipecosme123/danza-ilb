export const listUsersEnsayo = /* GraphQL */ `
  query ListUserss(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombres
        apellidos
        ensayos
      }
      nextToken
      __typename
    }
  }
`;