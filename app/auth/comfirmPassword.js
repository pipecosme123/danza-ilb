import React from 'react'
import { Box, Center, Text } from 'native-base'
import InputText from '../../components/InputText'
import InputPassword from '../../components/InputPassword'
import Buttons from '../../components/Buttons'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { confirmPassword, sendConfirmationCode } from '../../store/actions/userThunk'

const comfirmPassword = () => {

  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();


  const onSubmit = (data) => {
    dispatch(confirmPassword({
      username: 'super-admin',
      confirmationCode: '',
      newPassword: data.oldPassword
    }))
  }

  return (
    <Center w="100%" h="100%">
      <Text fontSize={"4xl"} bold>DanzaILB</Text>      <Text fontSize={"4xl"} bold>CONFIRM PASSWORD</Text>
      <Buttons onPress={() => dispatch(sendConfirmationCode({ username: 'super-admin' }))}>Iniciar Sesión</Buttons>
      <Box w={"100%"} px={10}>
        <InputPassword
          name={"oldPassword"}
          control={control}
          errors={errors.oldPassword}
          rules={{
            required: {
              value: true,
              message: "Este campo es requerido"
            }
          }}
          label={"Contraseña:"}
          type='password'
          placeholder={""}
        />

        <Buttons onPress={handleSubmit(onSubmit)}>Confirmar</Buttons>
      </Box>

    </Center>
  )
}

export default comfirmPassword