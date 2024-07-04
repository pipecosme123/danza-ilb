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

export const updateEnsayos = /* GraphQL */ `
  mutation UpdateEnsayos(
    $input: UpdateEnsayosInput!
    $condition: ModelEnsayosConditionInput
  ) {
    updateEnsayos(input: $input, condition: $condition) {
      id
    }
  }
`;