import React, { useEffect } from 'react'
import { Box, Center, Text } from 'native-base'
import InputText from '../../../components/InputText'
import Buttons from '../../../components/Buttons'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { confirmSignUpUser, resendCode } from '../../../store/actions/userThunk'
import { useLocalSearchParams } from 'expo-router'

const comfirmSignUp = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { resend } = useLocalSearchParams();

  const onSubmit = (data) => {
    dispatch(confirmSignUpUser(data));
  }

  useEffect(() => {
    if (resend === "true") {
      dispatch(resendCode());
    }
  }, []);

  return (
    <Center w="100%" h="100%">
      <Text fontSize={"4xl"} bold>DanzaILB</Text>
      <Text fontSize={"4xl"} bold>Verificar Cuenta</Text>

      <Box w={"100%"} px={10}>
        <InputText
          name={"code"}
          control={control}
          errors={errors.code}
          rules={{
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          }}
          label={"Código de confirmación:"}
          type='numeric'
          placeholder={"000-000"}
        />

        <Buttons onPress={handleSubmit(onSubmit)}>Confirmar</Buttons>
      </Box>

    </Center>
  )
}

export default comfirmSignUp