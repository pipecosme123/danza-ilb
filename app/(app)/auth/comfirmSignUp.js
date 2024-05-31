import React, { useEffect } from 'react'
import { Box, Text } from 'native-base'
import { useLocalSearchParams } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { InputText, Buttons } from '../../../components'
import { marginTopShort } from '../../../constants'
import { confirmSignUpUser, resendConfirmCode } from '../../../store/actions/users';

const comfirmSignUp = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { resend, username } = useLocalSearchParams();

  const onSubmit = ({ code }) => {
    dispatch(confirmSignUpUser({ code, username }));
  }

  useEffect(() => {
    if (resend === "true") {
      dispatch(resendConfirmCode({ username }));
    }
  }, []);

  return (
    <Box w="100%" h="100%" mt={marginTopShort}>
      <Text textAlign={'center'} fontSize={"4xl"} bold>DanzaILB</Text>
      <Text textAlign={'center'} fontSize={"4xl"} bold>Verificar Cuenta</Text>

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

    </Box>
  )
}

export default comfirmSignUp