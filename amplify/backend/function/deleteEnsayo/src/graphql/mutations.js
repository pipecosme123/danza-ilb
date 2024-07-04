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

export const deleteEnsayos = /* GraphQL */ `
  mutation DeleteEnsayos(
    $input: DeleteEnsayosInput!
    $condition: ModelEnsayosConditionInput
  ) {
    deleteEnsayos(input: $input, condition: $condition) {
      id
    }
  }
`;