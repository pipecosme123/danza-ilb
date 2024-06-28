export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      nombres
      apellidos
      ensayos
      updatedAt
    }
  }
`;

export const createEnsayos = /* GraphQL */ `
  mutation CreateEnsayos(
    $input: CreateEnsayosInput!
    $condition: ModelEnsayosConditionInput
  ) {
    createEnsayos(input: $input, condition: $condition) {
      id
    }
  }
`;